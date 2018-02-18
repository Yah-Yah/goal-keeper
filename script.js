//defines all variables I'm going to use in this code:
var canvas, ctx;
var fps = 60;
var ballRadius = 10;
var x, y;
var dx = Math.floor((Math.random() * 10) + 1);
var dy = Math.floor((Math.random() * 10) + 1);
var keeperHeight = 20;
var keeperWidth = 40;
var keeperX;
var rightPressed = false;
var leftPressed = false;
//var score = 0;
var lives;

//intro screen banner that leads to the game
var gameStarted = false;

//draws background of the intro screen banner
function drawBG() {
  ctx.beginPath();
  var grd=ctx.createRadialGradient(canvas.width/2,canvas.height/2,20,canvas.width/2,canvas.height/2,150);
  grd.addColorStop(0,"#373737");
  grd.addColorStop(1,"black");
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = grd;
  ctx.fillRect(10,10,150,100);
  ctx.fill();
  ctx.closePath();
}

function introScreen(){
  drawBG();

  ctx.font = "38px ArcadeClassic";
  ctx.fillStyle = "#0099CC";
  ctx.textAlign = "center";
  ctx.fillText("FOOTBALL", canvas.width/2, 162);

  ctx.font = "10px ArcadeClassic";
  ctx.fillStyle = "#fff";
  ctx.fillText("Press Spacebar", canvas.width/2, 220);
  
  //listens for the space press to enter the game
  document.body.addEventListener("keydown", function(event){
    if(event.keyCode == 32 && !gameStarted){
      startGame();
    }
  });
}


//Games starts from here:

function startGame(){
  lives = 3;
  gameStarted = true;
  clearCanvas();
  
  //places goalkeeper in the middle of the field
  keeperX = (canvas.width-keeperWidth)/2;
  
  //controls GoalKeeper movement with keyboard
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  setInterval(function(){
    draw();
  }, 1000/fps)
}

function clearCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//brings Ball element to the game
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

//brings GoalKeeper element to the game
  function drawKeeper() {
    ctx.beginPath();
    ctx.rect(keeperX, 180, keeperWidth, keeperHeight);
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


//where it all happens:
function draw() {
  clearCanvas();
  drawGoal();
  drawKeeper();
  drawBall();
  //drawScore;
  //drawLives;
  //drawGoals;
  x += dx;
  y += dy;
  //moves goalkeeper with keyboard but within canvas edges
  if(rightPressed && keeperX < canvas.width-keeperWidth) {
    keeperX += 7;
  } else if(leftPressed && keeperX > 0) {
    keeperX -= 7;
  }
  //bouncing off the keeper
  /*
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
    if(x > keeperX && x < keeperX + keeperWidth) {
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
        keeperX = (canvas.width-keeperWidth)/2;
      }
    }
  }
  */
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
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  x = canvas.width/2;
  y = canvas.height-200;
  
  //intro screen with animation banner loads:
  introScreen();

  /*

  setInterval(draw, 10);
  */
  });
