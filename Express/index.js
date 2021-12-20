const express = require('express')
const app = express()
const port = 4000
var cors = require('cors')
var robot = require("robotjs");
var counter=0;


app.use(cors()) 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/post_name", async (req,res)=>{
    let {name} = req.body
    console.log(name)
    counter=counter+1;
    console.log(counter)
    res.send("")
    if(name=='victory'){

      
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Toggle Playback" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });


        robot.keyTap("audio_play");
    }
    if(name=='victory_down'){

      
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Toggle Mute" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });


        robot.keyTap("audio_mute");
    }


    if(name=='thumbs_up'){
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Volume Up" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });


        robot.keyTap("audio_vol_up");
    }

    if(name=='thumbs_down'){
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Thumbs Down" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });

        robot.keyTap("audio_vol_down");
    }

    if(name=='thumbs_right'){
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Go left" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });

        robot.keyTap("left");
    }

    if(name=='thumbs_left'){
      const { exec } = require('child_process');
      exec('osascript -e \'display notification "Go right" with title "Gesture Control"\' | grep js', (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        } else {
         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
        }
      });

        robot.keyTap("right");
    }

} )

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})