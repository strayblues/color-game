"use strict";

const NUM_OF_ROUNDS = 3;

var numSquares = 3,
    colors = [],
    hexColor,
    selectedItem,
    pickedColor,
    clickedColor,
    score,
//    roundOver = false,
    roundCount = 0,
    lives = 3,
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
  //console.log(selectedItem); // test

  clickedColor = this.style.backgroundColor;
  if(clickedColor === pickedColor){
    setScore(score+1);
    updateUserLevel("harder");
    handleCorrect();
  }
  else {
    setScore(score-1);
    updateUserLevel("easier");
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

function handleCorrect(){
  $(selectedItem).addClass('scaleDown');
//  document.body.style.background = pickedColor;
  $('.square').addClass('scaleDown');
  $('#colorDisplay').hide();
  $('#scoreDisplay').hide();
  $('#msg-success').show();
  setTimeout(function(){
    $('.square').removeClass('scaleDown');
    $('#msg-success').hide();
    $('#colorDisplay').show();
    $('#scoreDisplay').show();
//    document.body.style.background = 'whitesmoke';
  }, 1250);
}

function handleWrong(){
  $(selectedItem).addClass('changeShape');
  $('.square').addClass('scaleDown');
  var scoreText = document.getElementById('score');
  var origColor = scoreText.style.color;
  scoreText.style.color = 'red';

  setTimeout(function(){
    $(selectedItem).removeClass('changeShape');
    $('.square').removeClass('scaleDown');
    scoreText.style.color = origColor;
  }, 1250);
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

function colorToStr(){
  for(var i=0; i<colors.length; i++){
    var r = colors[i][0];
    var g = colors[i][1];
    var b = colors[i][2];
    colors[i] = "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function reset(){
  colors = 0;
  colors = generateRandomColors(numSquares);
  colorToStr();
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
