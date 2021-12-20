import { Finger, Finger_Curl, Finger_Direction } from './Finger_Description';
import Gesture_Description from './Gesture_Description';



// victory down gesture
const victoryDownDescription = new Gesture_Description('victory_down');


// thumb
victoryDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.VerticalDown, 1.0);
victoryDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownLeft, 1.0);
victoryDownDescription.Direction_Define(Finger.Thumb, Finger_Direction.DiagonalDownRight, 1.0);

// index
victoryDownDescription.Curl_Define(Finger.Index, Finger_Curl.NoCurl, 1.0);
victoryDownDescription.Direction_Define(Finger.Index, Finger_Direction.VerticalDown, 1.0);
victoryDownDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalDownLeft, 1.0);
victoryDownDescription.Direction_Define(Finger.Index, Finger_Direction.DiagonalDownRight, 1.0);
victoryDownDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalLeft, 1.0);
victoryDownDescription.Direction_Define(Finger.Index, Finger_Direction.HorizontalRight, 1.0);

// middle
victoryDownDescription.Curl_Define(Finger.Middle, Finger_Curl.NoCurl, 1.0);
victoryDownDescription.Direction_Define(Finger.Middle, Finger_Direction.VerticalDown, 1.0);
victoryDownDescription.Direction_Define(Finger.Middle, Finger_Direction.DiagonalDownLeft, 1.0);
victoryDownDescription.Direction_Define(Finger.Middle, Finger_Direction.DiagonalDownRight, 1.0);
victoryDownDescription.Direction_Define(Finger.Middle, Finger_Direction.HorizontalLeft, 1.0);
victoryDownDescription.Direction_Define(Finger.Middle, Finger_Direction.HorizontalRight, 1.0);

// ring
victoryDownDescription.Curl_Define(Finger.Ring, Finger_Curl.FullCurl, 1.0);
victoryDownDescription.Curl_Define(Finger.Ring, Finger_Curl.HalfCurl, 0.9);

// pinky
victoryDownDescription.Curl_Define(Finger.Pinky, Finger_Curl.FullCurl, 1.0);
victoryDownDescription.Curl_Define(Finger.Pinky, Finger_Curl.HalfCurl, 0.9);

export default victoryDownDescription;
