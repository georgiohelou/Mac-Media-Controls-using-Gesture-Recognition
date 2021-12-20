//import all the different components of the classification module
//export to be used in App.js

import GestureClassifier from './Gesture_Classifier';
import Gesture_Description from './Gesture_Description';
import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';

export default {
  GestureClassifier, Gesture_Description,
  Finger, Finger_Curl, Finger_Direction
};
