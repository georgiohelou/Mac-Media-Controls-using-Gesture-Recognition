//import Recat , react webcam and css 
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./App.css";
//import tensorflow, mediapipe handpose and hand drawing functions
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { Draw } from "./Canvas_Draw";
// import gesture classifier
import  {default as cl} from "./classifier.js" 
//import pre defined gestures 
import VictoryGesture from './Victory';
import VictoryDownGesture from './VictoryDown';
import ThumbsUpGesture from './ThumbsUp';
import ThumbsDownGesture from './ThumbsDown';
import ThumbsLeftGesture from './ThumbsLeft';
import ThumbsRightGesture from './ThumbsRight';
//import axios API
import axios from 'axios'

function App() {
  //Define Camera reference and gesture feed counters
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var old = 'hello';
  var counter_victory=0;
  var counter_thumbsup=0;
  var counter_thumbsdown=0;
  var counter_victory_down=0;
  var counter_thumbs_right=0;
  var counter_thumbs_left=0;
  var name='';
  var counter=0;

//asynchronous functions to run mediapipe handpose
  const runPipe = async () => {
    const HP = await handpose.load();
    //  Loop and detect hands
    setInterval(() => {
      FeedIN(HP);
    }, 10);
  };

  const FeedIN = async (HP) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // canvas Properties
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await HP.estimateHands(video);

      if (hand.length > 0) {
        const Classifier = new cl.GestureClassifier([
          VictoryGesture,
          VictoryDownGesture,
          ThumbsUpGesture,
          ThumbsDownGesture,
          ThumbsLeftGesture,
          ThumbsRightGesture,
        ]);
        //Call classifier on detected hand
        const gesture = await Classifier.Estimate(hand[0].landmarks, 80);
        //if gestures are detected extract predictions
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          //extract gestures confidence
          const confidence = gesture.gestures.map((prediction) => prediction.Match_Score);
          //choose gestures with maximum confidence
          const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));


          //In each case of gesture with max confidence
          //feed it into optimization module
          //send Post request to the backend with gesture name
          if(gesture.gestures[maxConfidence].name=='victory'){
            counter=counter+1;
            counter_victory = counter_victory+1;
            if(counter_victory>=50){
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name,counter
              })
              .then(response => {
                  console.log(response)
                  console.log('here')
              })
              .catch(error => {
                console.log(error)
              }) 

            }
          }

          if(gesture.gestures[maxConfidence].name=='victory_down'){
            counter=counter+1;
            counter_victory_down = counter_victory_down+1;
            if(counter_victory_down>=40){
              //console.log("here");
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name,counter
              })
              .then(response => {
                  console.log(response)
                  console.log('here')
              })
              .catch(error => {
                console.log(error)
              }) 

            }
          }

          if(gesture.gestures[maxConfidence].name=='thumbs_up'){
            counter_thumbsup = counter_thumbsup+1;
            if(counter_thumbsup>=30){
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name
              })
              .then(response => {
                  console.log(response)
              })
              .catch(error => {
                console.log(error)
              })  


            }
          }


          if(gesture.gestures[maxConfidence].name=='thumbs_down'){
            counter_thumbsdown = counter_thumbsdown+1;
            if(counter_thumbsdown>=30){
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name
              })
              .then(response => {
                  console.log(response)
              })
              .catch(error => {
                console.log(error)
              })  


            }
          }

          if(gesture.gestures[maxConfidence].name=='thumbs_right'){
            counter_thumbs_right = counter_thumbs_right+1;
            if(counter_thumbs_right>=30){
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name
              })
              .then(response => {
                  console.log(response)
              })
              .catch(error => {
                console.log(error)
              })  


            }
          }

          if(gesture.gestures[maxConfidence].name=='thumbs_left'){
            counter_thumbs_left = counter_thumbs_left+1;
            if(counter_thumbs_left>=30){
              counter_victory=0;
              counter_thumbsup=0;
              counter_thumbsdown=0;
              counter_victory_down=0;
              counter_thumbs_right=0;
              counter_thumbs_left=0;
              name = gesture.gestures[maxConfidence].name
              axios.post('http://localhost:4000/post_name', {
               name
              })
              .then(response => {
                  console.log(response)
              })
              .catch(error => {
                console.log(error)
              })  


            }
          }
          old = gesture.gestures[maxConfidence].name;
        }
      }
      // Draw Hand lines
      const ctx = canvasRef.current.getContext("2d");
      Draw(hand, ctx);
    }
  };

  useEffect(()=>{runPipe()},[]);
//show canvas
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;

