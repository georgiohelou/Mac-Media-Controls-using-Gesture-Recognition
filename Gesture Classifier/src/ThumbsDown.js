import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';


// thumbs down gesture
const thumbsDownDescription = new Gesture_Description('thumbs_down');

// thumb:
thumbsDownDescription.Curl_Define(Finger.Thumb, Finger_Curl.NoCurl, 1.0);
thumbsDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.VerticalDown, 1.0);
thumbsDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownLeft, 0.9);
thumbsDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownRight, 0.9);

// other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsDownDescription.Curl_Define(finger, Finger_Curl.FullCurl, 1.0);
    thumbsDownDescription.Curl_Define(finger, Finger_Curl.HalfCurl, 0.9);
  }

//  the index finger not fully down and not fully up
thumbsDownDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalDownLeft, 1.0);
thumbsDownDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalLeft, 1.0);
thumbsDownDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalRight, 1.0);
thumbsDownDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalDownRight, 1.0);

export default thumbsDownDescription;
