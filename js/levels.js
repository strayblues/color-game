"use strict";

var userLevel = 300;

// L1 distance
function colorDifference(a, b){
  var redDiff = Math.abs(a[0] - b[0]),
      greenDiff = Math.abs(a[1] - b[1]),
      blueDiff = Math.abs(a[2] - b[2]);
  // values between 0 and 765
  var diff = redDiff+greenDiff+blueDiff;

  return diff;
}

function detectLevel(colorList){
  var a = colorDifference(colorList[0], colorList[1]);
  var b = colorDifference(colorList[1], colorList[2]);
  var c = colorDifference(colorList[0], colorList[2]);

  var smallestDiff = Math.min(a, b, c);

  return smallestDiff;
}


function generateRandomColors(num){
  var numTries = 0;
  while(true){
    var arr = [];
    for(var i=0; i<num; i++){
      arr.push(randomColor());
    }
    var easiness = detectLevel(arr);
    //console.log(easiness);
    numTries++
    if((easiness > (userLevel-(userLevel/10))) && (easiness < (userLevel+(userLevel/10)))) {
      //console.log("numTries: "+numTries);
      return arr;
    }
  }
}


function updateUserLevel(direction){
  if(direction == "easier"){
    userLevel += 35;
  }
  else if(direction == "harder"){
    userLevel -= 25;
  }
  if(userLevel > 500){
    userLevel = 500;
  }
  if(userLevel < 10){
    userLevel = 10;
  }
  console.log(userLevel);
}


function randomColor(){

  // Pick a 'red' from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // Pick a 'green' from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // Pick a 'blue' from 0 to 255
  var b = Math.floor(Math.random() * 256);

  return [r, g, b];
}


/*
// For first-timers
function practiceColor(){
  var r = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'green' value of 0 or 255
  var g = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'blue' value of 0 or 255
  var b = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;

  return [r, g, b];
}


// Generate a random color and convert to Hex
hexColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
return hexColor;
*/
