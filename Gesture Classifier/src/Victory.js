import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';



//  victory up gesture
const victoryDescription = new Gesture_Description('victory');


// thumb
victoryDescription.Direction_Define(Finger.Thumb, Finger_Direction.VerticalUp, 1.0);
victoryDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpLeft, 1.0);
victoryDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalUpRight, 1.0);

// index
victoryDescription.Curl_Define(Finger.Index, Finger_Curl.NoCurl, 1.0);
victoryDescription.Direction_Define(Finger.Index, Finger_Direction.VerticalUp, 1.0);
victoryDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalUpLeft, 1.0);
victoryDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalUpRight, 1.0);
victoryDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalLeft, 1.0);
victoryDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalRight, 1.0);

// middle
victoryDescription.Curl_Define(Finger.Middle, Finger_Curl.NoCurl, 1.0);
victoryDescription.Direction_Define(Finger.Middle, Finger_Direction.VerticalUp, 1.0);
victoryDescription.Direction_Define(Finger.Middle, Finger_Direction.DiagonalUpLeft, 1.0);
victoryDescription.Direction_Define(Finger.Middle, Finger_Direction.DiagonalUpRight, 1.0);
victoryDescription.Direction_Define(Finger.Middle, Finger_Direction.HorizontalLeft, 1.0);
victoryDescription.Direction_Define(Finger.Middle, Finger_Direction.HorizontalRight, 1.0);

// ring
victoryDescription.Curl_Define(Finger.Ring, Finger_Curl.FullCurl, 1.0);
victoryDescription.Curl_Define(Finger.Ring, Finger_Curl.HalfCurl, 0.9);

// pinky
victoryDescription.Curl_Define(Finger.Pinky, Finger_Curl.FullCurl, 1.0);
victoryDescription.Curl_Define(Finger.Pinky, Finger_Curl.HalfCurl, 0.9);

export default victoryDescription;
