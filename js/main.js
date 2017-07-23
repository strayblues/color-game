var numSquares = 6,
    colors = [],
    pickedColor,
    score = 0,
    userGuesses = 0,
    roundOver = false,
    rounds = 0,
    failureBadges = 0,
    lives = 0,
    squares = document.querySelectorAll('.square'),
    colorDisplay = document.getElementById('colorDisplay'),
    messageDisplay = document.querySelector('.message'),
    h2 = document.querySelector('h2'),
    resetButton = document.querySelector('#reset'),
    modeButtons = document.querySelectorAll('.mode');

init();

function init(){
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
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function handleScore(){
  userGuesses++;
  // Grab color of clicked square and...
  var clickedColor = this.style.backgroundColor;
  if(clickedColor === pickedColor){
    if (userGuesses === 1){
      score = score+3;
    } else if (userGuesses === 2){
      score = score+2;
    } else if (userGuesses === 3){
      score = score+1;
    } else if (userGuesses === 5){
      score = score-1;
    }
    roundOver = true; // Trigger a popup?
    rounds++;
    reset();
  } else if(userGuesses === numSquares-1){ // (userGuesses === 5 or 2)
      score = score-2;
      roundOver = true; // Trigger a popup?
      rounds++;
      reset();
  } else { // (userGuesses < 5 or 2)
      this.style.backgroundColor = '#f5f5f5';
  }
  if (rounds > 4){
    gameOver();
  }
}

function gameOver(){
  if (score < 1){
    alert('GAME OVER: Your Score is ' + score + '. You get a failure badge! (Not really)');
    failureBadges++;
  }
  else if (score < 10){
    alert('GAME OVER: Your Score is ' + score + '.');
  }
  else {
    alert('Your Score is ' + score + '. You have gained an extra life! (Not really)');
    lives++;
  }
  rounds = 0;
  score = 0;
  reset();
}

function setUpSquares(){
  for(var i=0; i<squares.length; i++){
    // Add click listeners to squares
    squares[i].addEventListener('click', handleScore);
  }
  return score;
}

function reset(){
  colors = generateRandomColors(numSquares);
  // Pick a new random color from array
  pickedColor = pickColor();
  // Change color display to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  messageDisplay.textContent = 'Score: ' + score;
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
  score = score;
  userGuesses = 0;
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
  // Pick a 'red' from 0 -255
  var r = Math.floor(Math.random() * 256);
  // Pick a 'green' from 0 -255
  var g = Math.floor(Math.random() * 256);
  // Pick a 'blue' from 0 -255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
