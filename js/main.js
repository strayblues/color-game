"use strict";

var numSquares = 3,
    colors = [],
    hexColor,
    pickedColor,
    clickedColor,
    score,
//    userGuesses = 0,
    roundOver = false,
    rounds = 0,
    lives = 3,
    RGBModel = true,
    squares = document.querySelectorAll('.square'),
    colorDisplay = document.getElementById('colorDisplay'),
    scoreDisplay = document.querySelector('#score'),
    livesDisplay = document.querySelector('#lives'),
    h2 = document.querySelector('h2'),
    resetButton = document.querySelector('#reset'),
    modeButtons = document.querySelectorAll('.mode');

init();

function init(){
  setScore(0);
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener('click', function(){
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
//      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function handleDeath(){
  if (lives < 1) {
    $("#life").hide();
    $("#death").show();
  }
}

function handleScore(){
  handleDeath();
  if (rounds === 4){
    gameOver();
    reset();
  }
  else {
//    userGuesses++;
    // Grab color of clicked square and...
    clickedColor = this.style.backgroundColor;
    if(clickedColor === pickedColor){
      setScore(score+1);
      document.body.style.background = pickedColor;
    }
    else {
      setScore(score-1);
      changeScoreColor();
      this.style.backgroundColor = '#f5f5f5';
    }
    roundOver = true; // Trigger a popup?
    rounds++;
    reset();
  }
}

function changeScoreColor(){
  var scoreText = document.getElementById('score');
  var origColor = scoreText.style.color;
  scoreText.style.color = 'red';
   setTimeout(function(){
     scoreText.style.color = origColor;
   }, 2000);
}

function gameOver(){
  setScore(score);
  console.log('Score: ' + score +' Lives: ' + lives);
  rounds = 0;
  if (score > 2){
    lives++;
  }
  else if (score < 0){
    lives--;
  }
  alert('Game Over! Score: '+score+' Lives: ' +lives);
  setScore(0);
}

function setUpSquares(){
  for(var i=0; i<squares.length; i++){
    // Add click listeners to squares
    squares[i].addEventListener('click', handleScore);
  }
  return score;
  return lives;
//  setScore(0);
}

function setScore(newScore){
  scoreDisplay.textContent = "Score: "+newScore;
  score = newScore;
}

function setLives(newLives){
  livesDisplay.textContent = " Lives: "+lives;
  lives = newLives;
}

function reset(){
  colors = generateRandomColors(numSquares);
  // Pick a new random color from array
  pickedColor = pickColor();
  // Change color display to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  // Change colors of squares
  for(var i=0; i<squares.length; i++){
    if(colors[i]){
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h2.style.backgroundColor = '#88a19f';
//  userGuesses = 0;
}

resetButton.addEventListener('click', function(){
  reset();
});

function changeColors(color){
  // Loop thru all squares
  for(var i=0; i<squares.length; i++){
    // Change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num){
  // Make an array
  var arr = []
  // repeat num times
  for(var i=0; i<num; i++){
    // Get random color and push into array
    arr.push(randomColor());
  }
  // Return that array
  return arr;
}

function randomColor(){
  if(RGBModel === true){
    // Pick a 'red' from 0 -255
    var r = Math.floor(Math.random() * 256);
    // Pick a 'green' from 0 -255
    var g = Math.floor(Math.random() * 256);
    // Pick a 'blue' from 0 -255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  else {
    hexColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    return hexColor;
  }
}

function toggleModel(){
  if (RGBModel === true){
    RGBModel = false;
    $('#toggle').text('RGB');
  }
  else {
    RGBModel = true;
    $('#toggle').text('Hex');
  }
  init();
}
