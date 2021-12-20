/* eslint-disable no-unused-expressions */
export default class Gesture_Description {
  constructor(name) {
    // choose a unique name for the Gesture
    this.name = name;
    // gesture as described by curls / directions
    this.directions = {};
    this.curls = {};
  }
//Direction definition
  Direction_Define(finger, direction, Weight=1.0) {
    if(typeof this.directions[finger] === 'undefined') { this.directions[finger] = [];}
    this.directions[finger].push([direction, Weight]);
  }
//Curl definition
  Curl_Define(finger, curl, Weight=1.0) {
    if(typeof this.curls[finger] === 'undefined') {this.curls[finger] = [];}
    this.curls[finger].push([curl, Weight]);
  }

  //Compare the the Curl and Direction characteristics of the gesture from the video feed to the pre defined gestures
  CompareGesture(Video_Curls, Video_Directions) {
    //define the match score and parameter count
    let Match_Score = 0.0;
    let Parameter_Count = 0;


    // look at the detected direction of each finger and compare with
    // the expected direction of this finger inside current gesture
        for(let Finger_Index in Video_Directions) {

          let detectedDirection = Video_Directions[Finger_Index];
          let expectedDirections = this.directions[Finger_Index];
    
          if(typeof expectedDirections === 'undefined') {continue;}
    
          // increase the number of relevant parameters
          Parameter_Count++;
    
          // compare to each possible direction of this specific finger
          let matchingDirectionFound = false;
          let highestDirectionWeight = 0;
          for(const [expectedDirection, Weight] of expectedDirections) {
            if(detectedDirection == expectedDirection) {
              Match_Score += Weight;
              highestDirectionWeight = Math.max(highestDirectionWeight, Weight);
              matchingDirectionFound = true;
              break;}
          }
    
          // subtract penalty if direction was expected but not found
          if(!matchingDirectionFound) {Match_Score -= highestDirectionWeight;}
        }

    // look at the detected curl of each finger and compare with
    // the expected curl of this finger inside current gesture
    for(let Finger_Index in Video_Curls) {

      let Video_Curl = Video_Curls[Finger_Index];
      let Expected_Curls = this.curls[Finger_Index];

      if(typeof Expected_Curls === 'undefined') {continue;}

      // increase the number of relevant parameters
      Parameter_Count++;

      // compare to each possible curl of this specific finger
      let Found_Curl_Match = false;
      let highestCurlWeight = 0;
      for(const [expectedCurl, Weight] of Expected_Curls) {
        if(Video_Curl == expectedCurl) {
          Match_Score += Weight;
          highestCurlWeight = Math.max(highestCurlWeight, Weight);
          Found_Curl_Match = true;
          break;}
      }

      // subtract penalty if curl was expected but not found
      if(!Found_Curl_Match) {Match_Score -= highestCurlWeight;}
    }

    // multiply final Match_Score with 10 (to maintain compatibility)
    let Final_Score = (Match_Score / Parameter_Count) * 100;

    return Final_Score;
  }
}