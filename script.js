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

function startGameHandl
