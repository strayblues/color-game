
// For first-timers
function practiceColor(){
  var r = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'green' value of 0 or 255
  var g = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'blue' value of 0 or 255
  var b = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num){
  var arr = [];
    for(var i=0; i<num; i++){
      arr.push(randomColor());
    }
  return arr;
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
// Generate a random color and convert to Hex
hexColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
return hexColor;
*/
