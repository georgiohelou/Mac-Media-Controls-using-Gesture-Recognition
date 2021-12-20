import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';


// thumbs down gesture 
const thumbsLeftDescription = new Gesture_Description('thumbs_left');

// thumb:
thumbsLeftDescription.Curl_Define(Finger.Thumb, Finger_Curl.NoCurl, 1.0);
thumbsLeftDescription.Direction_Define(Finger.Thumb, Finger_Direction.HorizontalLeft, 1.0);
thumbsLeftDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownLeft, 0.9);
thumbsLeftDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpLeft, 0.9);

// all other fingers:
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsLeftDescription.Curl_Define(finger, Finger_Curl.FullCurl, 1.0);
    thumbsLeftDescription.Curl_Define(finger, Finger_Curl.HalfCurl, 0.9);
}

export default thumbsLeftDescription;
