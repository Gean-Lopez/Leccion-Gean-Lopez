const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Juego pausado hasta iniciar
let gameStarted = false;

// Pelota
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 40;  // un poco arriba de la base
let dx = 2;
let dy = -2;

// Paleta (base negra)
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Movimiento paleta
let rightPressed = false;
let leftPressed = false;

// Eventos teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", startGameHandler, false);

function startGameHandler(e) {
  if (!gameStarted && e.key === "Enter") {
    gameStarted = true;
    draw(); // Inicia el juego
  }
}

function keyDownHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if(e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// Dibuja la pelota roja
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Dibuja la paleta negra (base)
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// Mensaje pantalla inicio
function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Presiona ENTER para comenzar", canvas.width / 2, canvas.height / 2);

  // Dibuja la paleta y la pelota en la posición inicial
  drawPaddle();
  drawBall();
}

function draw() {
  if(!gameStarted) {
    drawStartScreen();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  // Rebote en paredes
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if(y + dy < ballRadius) dy = -dy;
  else if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Fin del juego");
      document.location.reload();
    }
  }

  // Movimiento paleta
  if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

// Dibuja pantalla inicio antes de empezar
drawStartScreen();
