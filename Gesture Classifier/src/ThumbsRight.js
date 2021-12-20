import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';


// thumbs down gesture 
const thumbsRightDescription = new Gesture_Description('thumbs_right');

// thumb
thumbsRightDescription.Curl_Define(Finger.Thumb, Finger_Curl.NoCurl, 1.0);
thumbsRightDescription.Direction_Define(Finger.Thumb, Finger_Direction.HorizontalRight, 1.0);
thumbsRightDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownRight, 0.9);
thumbsRightDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpRight, 0.9);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsRightDescription.Curl_Define(finger, Finger_Curl.FullCurl, 1.0);
    thumbsRightDescription.Curl_Define(finger, Finger_Curl.HalfCurl, 0.9);
  }

export default thumbsRightDescription;
