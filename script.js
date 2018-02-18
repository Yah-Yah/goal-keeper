//intro banner that leads to the game

    var gameStarted = false;


    function intro_screen(){
      context.font = "38px ArcadeClassic";
      context.fillStyle = "#0099CC";
      context.textAlign = "center";
      context.fillText("FOOTBALL", canvas.width/2, 162);

      context.font = "10px ArcadeClassic";
      context.fillStyle = "#fff";
      context.fillText("Press Spacebar", canvas.width/2, 220);
    }

    document.body.addEventListener("keydown", function(event){
      if(event.keyCode == 32 && !gameStarted){
        startGame();
      }
    });

    function startGame(){
      gameStarted = true;
      clearCanvas();

      setInterval(function(){
        clearCanvas();
        loop();
      }, 1000/30)
    }


    function clearCanvas(){
      context.clearRect(0, 0, 300, 250);
    }

    intro_screen();

//Games starts from here:

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

window.addEventListener('load', function() {

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  x = canvas.width/2;
  y = canvas.height-200;
  paddleX = (canvas.width-paddleWidth)/2;

  //controls GoalKeeper movement with keyboard
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  setInterval(draw, 10);
  });

