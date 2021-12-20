import { Finger, Finger_Curl, Finger_Direction } from './FingerDescription';
import Gesture_Description from './Gesture_Description';

// Define Gesture Description
export const rockDescription = new Gesture_Description('rock'); 


rockDescription.Curl_Define(Finger.Thumb, Finger_Curl.NoCurl, 1.0)
rockDescription.Direction_Define(Finger.Thumb, Finger_Direction.HorizontalLeft, 0.25);
rockDescription.Direction_Define(Finger.Thumb, Finger_Direction.HorizontalRight, 0.25);


rockDescription.Curl_Define(Finger.Index, Finger_Curl.NoCurl, 1.0)
rockDescription.Direction_Define(Finger.Index, Finger_Direction.VerticalUp, 0.25);


rockDescription.Curl_Define(Finger.Pinky, Finger_Curl.NoCurl, 1.0)
rockDescription.Direction_Define(Finger.Pinky, Finger_Direction.VerticalUp, 0.25);

for(let finger of [Finger.Middle, Finger.Ring]){
    rockDescription.Curl_Define(finger, Finger_Curl.FullCurl, .75); 
    rockDescription.Direction_Define(finger, Finger_Direction.VerticalDown, 0.25);
}

export default rockDescription;