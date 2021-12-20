const FingerPoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};
export const Draw = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab Pipe_Input
      const Pipe_Input = prediction.landmarks;

      // Loop through fingers
      for (let j = 0; j < Object.keys(FingerPoints).length; j++) {
        let finger = Object.keys(FingerPoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < FingerPoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = FingerPoints[finger][k];
          const secondJointIndex = FingerPoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            Pipe_Input[firstJointIndex][0],
            Pipe_Input[firstJointIndex][1]
          );
          ctx.lineTo(
            Pipe_Input[secondJointIndex][0],
            Pipe_Input[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
    });
  }
};
