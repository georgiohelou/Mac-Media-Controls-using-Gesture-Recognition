
//define finger as set of 5 elements which are the fingers
const Finger = { Thumb:  0,Index:  1,Middle: 2,Ring:   3,Pinky:  4,

// define all for iteration purposes
  all: [0, 1, 2, 3, 4],

//map every index to a string of its name
  MappingOfNames: {0: 'Thumb',1: 'Index',2: 'Middle',3: 'Ring',4: 'Pinky'},

// Divide the 21 Pts returned by Handpose into their respective fingers
// note than 0 represents the palm and each larger index the tip of its finger

  MappingOfPoints: { 0: [[0, 1], [1, 2], [2, 3], [3, 4]], 1: [[0, 5], [5, 6], [6, 7], [7, 8]], 2: [[0, 9], [9, 10], [10, 11], [11, 12]], 3: [[0, 13], [13, 14], [14, 15], [15, 16]], 4: [[0, 17], [17, 18], [18, 19], [19, 20]]},

//create a function that takes an index and returns the corresposnding finger Name
  getNameOfFinger: function(value) {
    if(typeof this.MappingOfNames[value] !== undefined){
      return this.MappingOfNames[value]
    } else{return false}
  },
  //create a function that takes an index and returns the corresposnding finger Pts
  getPointsOfFinger: function(value) {
    if(typeof this.MappingOfPoints[value] !== undefined){
      return this.MappingOfPoints[value]
    }else{return false}
  },
}
//Define a set of Finger Directions
const Finger_Direction = {

  VerticalUp: 0,
  VerticalDown: 1,
  HorizontalLeft: 2,
  HorizontalRight: 3,
  DiagonalUpRight: 4,
  DiagonalUpLeft: 5,
  DiagonalDownRight: 6,
  DiagonalDownLeft: 7,

  MappingOfNames: {
    0: 'Vertical Up',
    1: 'Vertical Down',
    2: 'Horizontal Left',
    3: 'Horizontal Right',
    4: 'Diagonal Up Right',
    5: 'Diagonal Up Left',
    6: 'Diagonal Down Right',
    7: 'Diagonal Down Left',
  },

//create a function that takes an index and returns the corresposnding finger Direction
  getNameOfDirection: function(value) {
    if(typeof this.MappingOfNames[value] !== undefined){
      return this.MappingOfNames[value]
    }
    else{ return false}
  },
};
//Define Finger curl with possible values
const Finger_Curl = {NoCurl: 0, HalfCurl: 1, FullCurl: 2,

  MappingOfNames: { 0: 'No Curl', 1: 'Half Curl', 2: 'Full Curl'},

  //create a function that takes an index and returns the corresposnding finger curl name/degree
  getNameOfCurl: function(value) {
    if(typeof this.MappingOfNames[value] !== undefined){
      return this.MappingOfNames[value]
    }else{return false}
  },

};

export {
  Finger, Finger_Curl, Finger_Direction 
}
