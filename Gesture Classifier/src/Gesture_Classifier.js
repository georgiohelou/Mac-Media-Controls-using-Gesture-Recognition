import FingerClassifier from './Finger_Classifier';
import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';

export default class GestureClassifier {

  constructor(Defined_Gestures, estimatorOptions = {}) {

    //instantiate finger estimator
    this.estimator = new FingerClassifier(estimatorOptions);

    // list of predefined gestures
    this.gestures = Defined_Gestures;
  }
//estimation function takes the video input and the required passing accuracy (80% in our case)
  Estimate(Pipe_Input, MinPass_Acc) {

    //define a list of gestures found
    let Found_Gestures = [];

    //Estimate curl and direction of each finger
    const est = this.estimator.Estimate(Pipe_Input);

    let Finger_Info = [];
    for(let finger of Finger.all) {
      Finger_Info.push([
        Finger.getNameOfFinger(finger),
        Finger_Curl.getNameOfCurl(est.curls[finger]),
        Finger_Direction.getNameOfDirection(est.directions[finger])
      ]);
    }

    //compare gesture description to each known gesture
    for(let gesture of this.gestures) {
      let Match_Score = gesture.CompareGesture(est.curls, est.directions);
      //if geture score is higher than the required threshold add it to the output
      if(Match_Score >= MinPass_Acc) {Found_Gestures.push({
          name: gesture.name,
          Match_Score: Match_Score
        });
      }
    }

    return {
      Finger_Info: Finger_Info,
      gestures: Found_Gestures
    };
  }
}