"use strict";

const NUM_OF_ROUNDS = 3;

var numSquares = 3,
    colors = [],
    hexColor,
    selectedItem,
    pickedColor,
    clickedColor,
    score,
    level = 0,
//    roundOver = false,
    roundCount = 0,
    lives = 3,
    RGBModel = true,
    squares = document.querySelectorAll('.square'),
    colorDisplay = document.getElementById('colorDisplay'),
    scoreDisplay = document.querySelector('#score'),
    livesDisplay = document.querySelector('#lives'),
    roundsDisplay = document.querySelector('#rounds'),
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
  setLives(lives);
  if (lives < 1) {
    $("#life").hide();
    $("#death").show();
  }
}

function handleScore(){
  selectedItem = this;
  console.log(selectedItem); // test

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

  setTimeout(function(){

    roundCount++;
    if (roundCount === NUM_OF_ROUNDS){
      gameOver();
    }

    reset();
  }, 1250);

}

function setLevel(){
  if (lives < 5) {
    level = 0;
  }
  if (lives >= 5) {
    level = 1;
  }
  else if (lives >= 10){
    level = 2;
  }
  else if (lives >= 15){
    level = 3;
  }
}

function handleCorrect(){
  $(selectedItem).addClass('animateCorrect');
//  document.body.style.background = pickedColor;
  $('.square').addClass('animateCorrect');
  $('#colorDisplay').hide();
  $('#scoreDisplay').hide();
  $('#msg-success').show();
  setTimeout(function(){
    $('.square').removeClass('animateCorrect');
    $('#msg-success').hide();
    $('#colorDisplay').show();
    $('#scoreDisplay').show();
//    document.body.style.background = 'whitesmoke';
  }, 1250);
}

function handleWrong(){
  $(selectedItem).addClass('animateWrong');
  var scoreText = document.getElementById('score');
  var origColor = scoreText.style.color;
  scoreText.style.color = 'red';

  setTimeout(function(){
    $(selectedItem).removeClass('animateWrong');
    scoreText.style.color = origColor;
  }, 500);
}

function handleGetALife(){
  var livesText = document.getElementById('lives');
  var origColor = livesText.style.color;
  livesText.style.color = 'green';
  setTimeout(function(){
    livesText.style.color = origColor;
  }, 2000);
}

function gameOver(){
  setScore(score);
//  console.log('Score: ' + score +' Lives: ' +lives);
  if (score === NUM_OF_ROUNDS){
    setLives(lives+1);
    handleGetALife();
  }
  else {
    setLives(lives-1);
  }
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

function setRounds(newRoundNum){
  roundsDisplay.textContent = (newRoundNum+1)+" out of "+NUM_OF_ROUNDS;
  rounds = newRoundNum;
}

function reset(){
  colors = 0;
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
  setLevel();
  var arr = [];
  //for(var k=0; k<num; k++){
    if (level === 0){

      for(var i=0; i<num; i++){
        arr.push(randomColor());
      } // array now has 3 elements, some may be the same

      for(var j = 0; j < num; j++){
        arr = arr.sort(); // Put similar elements together
        for (var k=0; k<num; k++){ // Count occurences of a single element
          if(arr[j] === arr[k]){
            arr.pop(arr[k]); // Array may be less than 3 now
            arr.push(randomColor()); // Now 3
          } // Does it really repeat until they are all unique?
        }
      }
    }
    else {
      arr.push(randomColor()); // TODO Make pushed colors different
    }
//  }
  return arr;
}

function randomColor(){
  if(RGBModel === true){
    // Pick a 'red' from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // Pick a 'green' from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // Pick a 'blue' from 0 to 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  else {
    hexColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    return hexColor;
  }
}

// For first-timers
function practiceColor(){
  var r = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'green' value of 0 or 255
  var g = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;
  // Pick a 'blue' value of 0 or 255
  var b = (Math.floor(Math.random() * 2) == 0) ? 0 : 255;

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
