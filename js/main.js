"use strict";

const NUM_OF_ROUNDS = 4;

var numSquares = 3,
    colors = [],
    hexColor,
    pickedColor,
    clickedColor,
    score,
    roundOver = false,
    roundCount = 0,
    lives = 1,
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
  setLives(lives);
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
      reset();
    });
  }
}

function handleDeath(){
  document.body.style.background = 'whitesmoke';
  if (lives < 1) {
    $("#life").hide();
    $("#death").show();
  }
}

function handleScore(){
  clickedColor = this.style.backgroundColor;
  if(clickedColor === pickedColor){
    setScore(score+1);
    handleCorrect();
  }
  else {
    setScore(score-1);
    handleWrong();
    this.style.backgroundColor = '#f5f5f5';
  }
  roundOver = true;
  roundCount++;
  if (roundCount === NUM_OF_ROUNDS){
    gameOver();
  }
  reset();
}


function handleCorrect(){
  document.body.style.background = pickedColor;
  $('#colorDisplay').hide();
  $('#scoreDisplay').hide();
  $('#correct').show();
  setTimeout(function(){
    $('#correct').hide();
    $('#colorDisplay').show();
    $('#scoreDisplay').show();
    document.body.style.background = 'whitesmoke';
  }, 800);
}

function handleWrong(){
  var scoreText = document.getElementById('score');
  var origColor = scoreText.style.color;
  scoreText.style.color = 'red';
  setTimeout(function(){
    scoreText.style.color = origColor;
  }, 1800);
}

function gameOver(){
  setScore(score);
//  console.log('Score: ' + score +' Lives: ' +lives);
  if (score === NUM_OF_ROUNDS){
    setLives(lives+1);
  }
  else {
    setLives(lives-1);
  }
  alert('Game Over! Score: '+score+' Lives: ' +lives);
  handleDeath();
  setScore(0);
  roundCount = 0;
}

function setUpSquares(){
  for(var i=0; i<squares.length; i++){
    // Add click listeners to squares
    squares[i].addEventListener('click', handleScore);
  }
  return score;
}

function setScore(newScore){
  scoreDisplay.textContent = "Score: "+newScore;
  score = newScore;
}

function setLives(newLives){
  livesDisplay.textContent = "Lives: "+newLives;
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

/*
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
*/
