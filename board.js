const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

const board = createBoard();
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

// Set the canvas size to match the board
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

function drawBoard() {
  // Clear canvas
  ctx.fillStyle = "#000"; // background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cells
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x] !== 0) {
        ctx.fillStyle = "blue"; // filled block
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        ctx.strokeStyle = "#f7f1f1"; // cell border
        ctx.lineWidth = 2;
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      } else {
        ctx.strokeStyle = "#999"; // empty cell border
        ctx.lineWidth = 1;
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function drawPieceOnBoard() {
  const current = randomPiece();
  let posY = -1;
  let posX = 3;
  for (let y = 0; y < current.length; y++) {
    for (let x = 0; x < current[y].length; x++) {
      if (current[y][x] != 0) {
        board[y + posY][x + posX] = current[y][x];
      }
    }
  }
}

function drawPiece(current, offsetX, offsetY) {
  for (let y = 0; y < current.length; y++) {
    for (let x = 0; x < current[y].length; x++) {
      if (current[y][x] != 0) {
        ctx.fillStyle = "blue";
        ctx.fillRect(
          (x + offsetX) * BLOCK_SIZE,
          (y + offsetY) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );

        ctx.strokeStyle = "#f7f1f1";
        ctx.strokeRect(
          (x + offsetX) * BLOCK_SIZE,
          (y + offsetY) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

// drawPieceOnBoard()

let currentPiece = randomPiece();
let posX = 3;
let posY = -1;
drawPiece(currentPiece, posX, posY);

function update() {
  posY++;
  drawPiece(currentPiece, posX, posY);
}

function gameLoop() {
  drawBoard();
  drawPiece(currentPiece, posX, posY);

  setInterval(() => {
    update();
  }, 1000);
}

gameLoop();
