//define all variables I'm going to use in this code:
var canvas, ctx;
var ballRadius = 10;
var x, y;
var dx = Math.floor((Math.random() * 10) + 1);
var dy = Math.floor((Math.random() * 10) + 1);
var paddleHeight = 20;
var paddleWidth = 40;
var paddleX;
var rightPressed = false;
var leftPressed = false;
//var score = 0;
var lives = 3;

//intro banner that leads to the game
var gameStarted = false;

//draws bacground of the intro screen banner
function drawBG() {
  ctx.beginPath();
  ctx.rect(0, 0, 300, 250);
  ctx.fillStyle = "#666";
  ctx.fill();
  ctx.closePath();
}

function intro_screen(){
  drawBG();

  ctx.font = "38px ArcadeClassic";
  ctx.fillStyle = "#0099CC";
  ctx.textAlign = "center";
  ctx.fillText("FOOTBALL", canvas.width/2, 162);

  ctx.font = "10px ArcadeClassic";
  ctx.fillStyle = "#fff";
  ctx.fillText("Press Spacebar", canvas.width/2, 220);
}

/*
document.body.addEventListener("keydown", function(event){
  if(event.keyCode == 32 && !gameStarted){
    startGame();
  }
});
*/
function startGame(){
  gameStarted = true;
  clearCanvas();

  setInterval(function(){
    clearCanvas();
    loop();
  }, 1000/30)
}

/*
function loop(){
  console.log('game running');
}
*/

function clearCanvas(){
  ctx.clearRect(0, 0, 300, 250);
}


//Games starts from here:

//brings Ball element to the game
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

//brings GoalKeeper element to the game
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, 180, paddleWidth, paddleHeight);
    ctx.fillStyle = "#666";
    ctx.fill();
    ctx.closePath();
}

//brings Goal element to the game
function drawGoal() {
  ctx.beginPath();
  ctx.rect(50, 210, 200, 40);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}
/*
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#666";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#666";
  ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}*/

/*
//controls GoalKeeper movement with keyboard Right and Left key
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
*/

//where it all happens:
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGoal();
  drawPaddle();
  drawBall();
  //drawScore;
  //drawLives;
  x += dx;
  y += dy;
  //moves goalkeeper with keyboard but within canvas edges
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  //bouncing off the paddle
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
  //bouncing off the walls:
  if(y + dy > canvas.height - ballRadius || y + dy < 0) {
    dy = -dy;
  }
  if(x + dx > canvas.width - ballRadius || x + dx < 0) {
    dx = -dx;
  }
  if(y + dy > canvas.height - ballRadius || y + dy < 0) {
    dy = -dy;
  }
}

//waits for the DOM to load and then starts script
window.addEventListener('load', function() {
  
  //listens for the space press to enter the game
  document.body.addEventListener("keydown", function(event){
    if(event.keyCode == 32 && !gameStarted){
      startGame();
    }
  });

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  x = canvas.width/2;
  y = canvas.height-200;
  paddleX = (canvas.width-paddleWidth)/2;
  
  //intro screen with animation banner loads:
  intro_screen();

  /*
  //controls GoalKeeper movement with keyboard
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  setInterval(draw, 10);
  */
  });
