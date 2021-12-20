/* eslint-disable no-unused-expressions */
import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';


//export finger estimator
export default class FingerClassifier {

  Estimate(Pipe_Input) {

    // *****Calculate the Slopes of the fngrs

    //stores all coordinates for the XY direction
    let slopes_XY = [];
    //stores all coordinates for the YZ direction
    let slopes_YZ = [];

    for(let fngr of Finger.all) {

//**** Calculate the Slopes of the finger subparts
      let Pts = Finger.getPointsOfFinger(fngr);
      //store Pt slopes for each fingr
      let slope__XY = [];
      let slope__YZ = [];

      for(let Pt of Pts) {

        //select 2 joints
        let Pt1 = Pipe_Input[Pt[0]];
        let Pt2 = Pipe_Input[Pt[1]];

        // calculate single slope
        let slopes = this.Find_Slope(Pt1, Pt2);

        //get the slope relating to each direction
        let slope_XY = slopes[0];
        let slope_YZ = slopes[1];

        //push value calculate into array relating to the fngr
        slope__XY.push(slope_XY);
        slope__YZ.push(slope_YZ);
      }

      //push slopes of each fngr to the hand
      slopes_XY.push(slope__XY);
      slopes_YZ.push(slope__YZ);
    }

    //*****Calculate the orientations of the fngrs aka Curls and Directions
    let fngr_Curls = [];
    let fngr_Directions = [];

    for(let fngr of Finger.all) {

      // start fngr predictions from palm - except for thumb
      let PtIndexPos = (fngr == Finger.Thumb) ? 1 : 0;

      //get finger points from input according to mapping
      let fngrPointsPos = Finger.getPointsOfFinger(fngr);
      let Start_Pt = Pipe_Input[fngrPointsPos[PtIndexPos][0]];
      let Mid_Pt = Pipe_Input[fngrPointsPos[PtIndexPos + 1][1]];
      let End_Pt = Pipe_Input[fngrPointsPos[3][1]];

      // check if fngr is curled
      let fngrCurled = this.EstimateCurlOfFinger(
        Start_Pt, Mid_Pt, End_Pt
      );

      let fngrPosition = this.EstimateDirectOfFinger(
        Start_Pt, Mid_Pt, End_Pt,
        slopes_XY[fngr].slice(PtIndexPos)
      );

      fngr_Curls[fngr] = fngrCurled;
      fngr_Directions[fngr] = fngrPosition;
    }

    return { curls: fngr_Curls, directions: fngr_Directions }
  }

  EstimateSubHorizontalDirect(D13_X, D12_X, D23_X, Max_D_X) {
    //find the matching max distance and accordinglt set the subDirecion to Left or Right
    let EstDirection;
    if(Max_D_X == Math.abs(D13_X)) {
      if(D13_X > 0) {EstDirection = Finger_Direction.HorizontalLeft;} 
      else {EstDirection = Finger_Direction.HorizontalRight;}
    }

    else if(Max_D_X == Math.abs(D12_X)) {
      if(D12_X > 0) {EstDirection = Finger_Direction.HorizontalLeft;} 
      else {EstDirection = Finger_Direction.HorizontalRight;}
    }

    else {
      if(D23_X > 0) {EstDirection = Finger_Direction.HorizontalLeft;} 
      else {EstDirection = Finger_Direction.HorizontalRight;}
    }
    return EstDirection;
  }

  EstimateSubVerticalDirect(D13_Y, D12_Y, D23_Y, Max_D_Y) {
//find the matching max distance and accordinglt set the subDirecion to Up or Down
    let EstDirection;
    if(Max_D_Y == Math.abs(D13_Y)) {
      if(D13_Y < 0) {EstDirection = Finger_Direction.VerticalDown;} 
      else {EstDirection = Finger_Direction.VerticalUp;}
    }
    else if(Max_D_Y == Math.abs(D12_Y)) {
      if(D12_Y < 0) {EstDirection = Finger_Direction.VerticalDown;}
       else {EstDirection = Finger_Direction.VerticalUp;}
    }
    else {
      if(D23_Y < 0) {EstDirection = Finger_Direction.VerticalDown;} 
      else {EstDirection = Finger_Direction.VerticalUp;}
    }
    return EstDirection;
  }

  EstimateSubDiagonalDirection(D13_Y, D12_Y, D23_Y, Max_D_Y,D13_X, D12_X, D23_X, Max_D_X) {
//calculate the vertical and horizontal subdirections and combine them
    let EstDirection;
    let Sub_Vertical_Direction = this.EstimateSubVerticalDirect(D13_Y, D12_Y, D23_Y, Max_D_Y);
    let Sub_Horizontal_Direction = this.EstimateSubHorizontalDirect(D13_X, D12_X, D23_X, Max_D_X);
    
    if(Sub_Vertical_Direction == Finger_Direction.VerticalUp) {
      if(Sub_Horizontal_Direction == Finger_Direction.HorizontalLeft) {EstDirection = Finger_Direction.DiagonalUpLeft;} 
      else {EstDirection = Finger_Direction.DiagonalUpRight;}
    }
    else {
      if(Sub_Horizontal_Direction == Finger_Direction.HorizontalLeft) {EstDirection = Finger_Direction.DiagonalDownLeft;} 
      else { EstDirection = Finger_Direction.DiagonalDownRight;}
    }

    return EstDirection;
  }

    // Pt1, Pt2 are 2d or 3d Pt arrays (xy[z])
  // returns either a single scalar (2d) or array of two slopes (3d)
  Find_Slope(Pt1, Pt2) {

    let XY = this.Calculate_Slope(Pt1[0], Pt1[1], Pt2[0], Pt2[1]);
    if(Pt1.length == 2) {
      return XY;
    }

    let YZ = this.Calculate_Slope(Pt1[1], Pt1[2], Pt2[1], Pt2[2])
    return [XY, YZ];
  }

  Calculate_Slope(Pt1x, Pt1y, Pt2x, Pt2y) {

    let slope = Math.atan((Pt1y - Pt2y) / (Pt1x - Pt2x)) * 180 / Math.PI;

    if(slope <= 0) {slope = -slope;}
    else if(slope > 0) {slope = 180 - slope;}
    return slope;

  }

  //Estimate the Vertical, Diagonal and Horizontal Scores accoring to angle range
  AngleWeight(angle, AngleWeight = 1.0) {

    let Vertical_Score = 0;
    let Diagonal_Score = 0;
    let Horizontal_Score = 0;

    if(angle >= 75.0 && angle <= 105.0) {
      Vertical_Score = AngleWeight;
    }
    else if(angle >= 25.0 && angle <= 155.0) {
      Diagonal_Score = AngleWeight;
    }
    else {
      Horizontal_Score = AngleWeight;
    }

    return [Vertical_Score, Diagonal_Score, Horizontal_Score];
  }
//Estimate the Directtion of Finger 
  EstimateDirectOfFinger(Start_Pt, Mid_Pt, End_Pt, fngrSlopes) {
     //instantiate scores for each possible direction
    let ScoreOfVertical = 0.0;
    let ScoreOfDiagonal = 0.0;
    let ScoreOfHorizontal = 0.0;

//increase each Direction's score according to the Angle weight estimation for each part of the finger
    for(let fngrSlope of fngrSlopes) {
      let Scores = this.AngleWeight(fngrSlope, 0.9);
      ScoreOfVertical += Scores[0];
      ScoreOfDiagonal += Scores[1];
      ScoreOfHorizontal += Scores[2];
    }

//Where D12 is the distance between the start and themiddle, D23 the distance between the middle and endand D23 the distance between the middle and end.
//X and Y for the dimension
    let D12_X = Start_Pt[0] - Mid_Pt[0];
    let D13_X = Start_Pt[0] - End_Pt[0];
    let D23_X = Mid_Pt[0] - End_Pt[0]; 
    let D12_Y = Start_Pt[1] - Mid_Pt[1];
    let D13_Y = Start_Pt[1] - End_Pt[1];
    let D23_Y = Mid_Pt[1] - End_Pt[1];

    //Find the Max distance in X and Y
    let Max_D_X = Math.max(Math.abs(D12_X),Math.abs(D13_X),Math.abs(D23_X));
    let Max_D_Y = Math.max(Math.abs(D12_Y),Math.abs(D13_Y),Math.abs(D23_Y));

    //Calculate the distance ratio between the max distance in X and Y
    let DistanceRatio = Max_D_Y / (Max_D_X);

    //according to the ratio range increase the score of every possible direction
    if(DistanceRatio > 1.5) {
      ScoreOfVertical += 1.1;
    }
    else if(DistanceRatio > 0.66) {
      ScoreOfDiagonal += 1.1;
    }
    else {
      ScoreOfHorizontal += 1.1;
    }

    //calculate the distance between 2 points as the square root of the squares of the X and Y distances
    let D12 = Math.sqrt(D12_X * D12_X + D12_Y * D12_Y);
    let D13 = Math.sqrt(D13_X * D13_X + D13_Y * D13_Y);
    let D23 = Math.sqrt(D23_X * D23_X + D23_Y * D23_Y);

    //calculate the maximum distance between all points
    let Max_D = Math.max(D12, D13, D23);

    //set points that will be used for angle calculation according to the maximum sub part distance
    let PtForAngle_1X,PtForAngle_1Y,PtForAngle_2X,PtForAngle_2Y;

    if(Max_D == D13){
      PtForAngle_1X = Start_Pt[0],
      PtForAngle_1Y = Start_Pt[1];

      PtForAngle_2X = End_Pt[0],
      PtForAngle_2Y = End_Pt[1];
    }
    else if(Max_D == D12) {
      PtForAngle_2X = End_Pt[0],
      PtForAngle_2Y = End_Pt[1];
    }
    else if(Max_D == D23) {
      PtForAngle_1X = Mid_Pt[0],
      PtForAngle_1Y = Mid_Pt[1];
    }

    let AngleForAllFinger = this.Find_Slope([PtForAngle_1X, PtForAngle_1Y], [PtForAngle_2X, PtForAngle_2Y]);

  //increase each Direction's score according to the Angle weight estimation for the entire finger estimate
    let Scores = this.AngleWeight(AngleForAllFinger, 1.6);
    ScoreOfVertical += Scores[0];
    ScoreOfDiagonal += Scores[1];
    ScoreOfHorizontal += Scores[2];

    // in case of tie, highest preference goes to Vertical,
    // followed by horizontal and then diagonal

    //according to the best direction we calculate its subdirections
    let EstDirection;
    if(ScoreOfVertical == Math.max(ScoreOfVertical, ScoreOfDiagonal, ScoreOfHorizontal)) {
      EstDirection = this.EstimateSubVerticalDirect(D13_Y,D12_Y, D23_Y, Max_D_Y);
    }
    else if(ScoreOfHorizontal == Math.max(ScoreOfDiagonal, ScoreOfHorizontal)) {
      EstDirection = this.EstimateSubHorizontalDirect(D13_X,D12_X,D23_X, Max_D_X);
    }
    else {
      EstDirection = this.EstimateSubDiagonalDirection(D13_Y, D12_Y,D23_Y, Max_D_Y,D13_X, D12_X,D23_X, Max_D_X);
    }
    return EstDirection;
  }

  EstimateCurlOfFinger(Start_Pt, Mid_Pt, End_Pt) {

//Where D12 is the distance between the start and themiddle, D23 the distance between the middle and endand D23 the distance between the middle and end.
//X, Y and Z for the dimension
    let D12_X = Start_Pt[0] - Mid_Pt[0];
    let D13_X = Start_Pt[0] - End_Pt[0];
    let D23_X = Mid_Pt[0] - End_Pt[0];
    let D12_Y = Start_Pt[1] - Mid_Pt[1];
    let D13_Y = Start_Pt[1] - End_Pt[1];
    let D23_Y = Mid_Pt[1] - End_Pt[1];
    let D12_Z = Start_Pt[2] - Mid_Pt[2];
    let D13_Z = Start_Pt[2] - End_Pt[2];
    let D23_Z = Mid_Pt[2] - End_Pt[2];

    //calculate the distance between 2 points as the square root of the squares of the X, Y and Z distances
    let D12 = Math.sqrt(D12_X * D12_X +D12_Y * D12_Y +D12_Z * D12_Z);
    let D13 = Math.sqrt(D13_X * D13_X +D13_Y * D13_Y +D13_Z * D13_Z);
    let D23 = Math.sqrt(D23_X * D23_X +D23_Y * D23_Y +D23_Z * D23_Z);

    //calculate the cosinus from the distance and standardize it
    let cos_in = (D23 * D23 +D12 * D12 - D13 *D13) / (2 * D23 * D12);
    if(cos_in > 1.0) {cos_in = 1.0;}
    else if(cos_in < -1.0) {cos_in = -1.0;}

// calculate the curve angle as rad*arccos of the measure mod 180
    let Curve_Angle = (57.2958 * Math.acos(cos_in)) % 180;

    //Map Curve Angle to Curl options according to angle range
    let fngrCurl;
    if(Curve_Angle > 130.0) {fngrCurl = Finger_Curl.NoCurl;}
    else if(Curve_Angle > 60.0) {fngrCurl = Finger_Curl.HalfCurl;}
    else {fngrCurl = Finger_Curl.FullCurl;}

    return fngrCurl;
  }

}
