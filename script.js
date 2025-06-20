const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Estado del juego
let gameStarted = false;

// Pelota
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

// Paleta (base negra)
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Movimiento paleta
let rightPressed = false;
let leftPressed = false;

// Ladrillos
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Matriz ladrillos
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Puntaje
let score = 0;

// Eventos teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", startGameHandler, false);

function startGameHandler(e) {
  if (!gameStarted && e.key === "Enter") {
    gameStarted = true;
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
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

// Dibuja ladrillos verde oscuro
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#004d00"; // verde oscuro
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Detecta colisiones con ladrillos
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("¡GANASTE, Gean!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Dibuja texto de instrucciones en pantalla
function drawInstructions() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.fillText(
    "Usa ← y → para mover la paleta. Presiona ENTER para comenzar.",
    canvas.width / 2,
    canvas.height - 5
  );
}

// Mensaje pantalla inicio
function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "Black";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Presiona ENTER para comenzar", canvas.width / 2, canvas.height / 2);

  drawPaddle();
  drawBall();
  drawBricks();
  drawInstructions();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    drawStartScreen();
  } else {
    drawBricks();
    drawBall();
    drawPaddle();
    drawInstructions();
    collisionDetection();

    // Rebote en paredes
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert("Fin del juego");
        document.location.reload();
      }
    }

    // Movimiento paleta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  }

  requestAnimationFrame(draw);
}

draw();
