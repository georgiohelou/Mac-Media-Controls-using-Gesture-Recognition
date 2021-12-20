import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';


// thumbs up gesture
const thumbsUpDescription = new Gesture_Description('thumbs_up');

// thumb:
thumbsUpDescription.Curl_Define(Finger.Thumb, Finger_Curl.NoCurl, 1.0);
thumbsUpDescription.Direction_Define(Finger.Thumb, Finger_Direction.VerticalUp, 1.0);
thumbsUpDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpLeft, 0.9);
thumbsUpDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpRight, 0.9);

// all other fingers
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpDescription.Curl_Define(finger, Finger_Curl.FullCurl, 1.0);
  thumbsUpDescription.Curl_Define(finger, Finger_Curl.HalfCurl, 0.9);
}

//  the index finger not fully down and not fully up
thumbsUpDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalUpLeft, 1.0);
thumbsUpDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalLeft, 1.0);
thumbsUpDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalRight, 1.0);
thumbsUpDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalUpRight, 1.0);

export default thumbsUpDescription;
