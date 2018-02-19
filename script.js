//defines all variables I'm going to use in this code:
var canvas, ctx;
var fps = 60;
var ballRadius = 10;
var x, y;
var dx = Math.floor((Math.random() * 10) + 1);
var dy = Math.floor((Math.random() * 10) + 1);
var keeperX, keeperY;
var keeperWidth = 40;
var keeperHeight = 20;
var goalX, goalY;
var goalWidth = 200;
var goalHeight = 40;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives;
var goals;



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
    
  ctx.font = "56px ArcadeClassic";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#2cfdc9";
  ctx.textAlign = "center";
  ctx.fillText("Phantom", canvas.width/2, 122);
  ctx.strokeText("Phantom", canvas.width/2, 122);

  ctx.font = "38px ArcadeClassic";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#2cfdc9";
  ctx.textAlign = "center";
  ctx.fillText("FOOTBALL", canvas.width/2, 162);
  ctx.strokeText("FOOTBALL", canvas.width/2, 162);
  //ctx.letterSpacing = "3";

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
  
  //places goalkeeper in the middle of the field 10px above goal:
  keeperX = (canvas.width-keeperWidth)/2;
  //keeperY = (canvas.height-keeperHeight-goalHeight)-10;
  //places goal in the middle of the field at the bottom of the canvas
  //goalX = (canvas.width-goalWidth)/2;
  //goalY = (canvas.height-goalHeight);
  
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
    ctx.rect(keeperX, keeperY, keeperWidth, keeperHeight);
    ctx.fillStyle = "#666";
    ctx.fill();
    ctx.closePath();
}

//brings Goal element to the game
function drawGoal() {
  ctx.beginPath();
  ctx.rect(goalX, goalY, goalWidth, goalHeight);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

function drawLives() {
  ctx.font = "10px ArcadeClassic";
  ctx.fillStyle = "#666";
  ctx.textAlign = "left";
  ctx.fillText("Lives: " + lives, canvas.width-290, canvas.height-230);
}
function drawGoals() {
  ctx.font = "10px ArcadeClassic";
  ctx.fillStyle = "#666";
  ctx.textAlign = "left";
  ctx.fillText("Goals: " + goals, canvas.width-290, canvas.height-215);
}
function drawScore() {
  ctx.font = "10px ArcadeClassic";
  ctx.fillStyle = "#666";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, canvas.width-290, canvas.height-200);
}

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

// NOT SURE ABOUT THAT
function resetKeeper() {  
  keeperX = (canvas.width-keeperWidth)/2;
}

function resetBall() {
  x += dx;
  y += dy;
}


//where it all happens:
function draw() {
  clearCanvas();
  drawGoal();
  drawKeeper();
  drawBall();
  drawScore();
  drawLives();
  drawGoals();
  x += dx;
  y += dy;
  //moves goalkeeper with keyboard but within canvas edges
  if(rightPressed && keeperX < canvas.width-keeperWidth) {
    keeperX += 7;
  } else if(leftPressed && keeperX > 0) {
    keeperX -= 7;
  }
  /*
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
  */
  
  //NIEDOKONCZONE!!!!!!
  //bouncing off walls
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  //Game Over when ball reaches bottom and Keeper catches the ball
  if(y + dy > canvas.height-ballRadius) {
      if(x > keeperX && x < keeperX + keeperWidth) {
        alert("Score!");
        lives--;
        resetKeeper();
        resetBall();
  } else if(y + dy < ballRadius) {
    dy = -dy;
      } else {
        lives--;
        if(!lives) {
        alert("Goal");
        resetKeeper();
        resetBall();
        //document.location.reload();
        }
      }
  }
  
  /*
  //bouncing off the keeper
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
  }*/
  
}

//waits for the DOM to load and then starts script
window.addEventListener('load', function() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  
  //defines starting point of a ball:
  x = canvas.width/2;
  y = canvas.height-200;
  
  //places goal in the middle of the field at the bottom of the canvas
  goalX = (canvas.width-goalWidth)/2;
  goalY = (canvas.height-goalHeight);
  //places goalkeeper 10px above goal:
  keeperY = goalY-keeperHeight-10;
  
  
  //intro screen with animation banner loads:
  introScreen();

  });
