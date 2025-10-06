const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30; //pixels

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

let currentPiece = randomPiece();
let posX = 3;
let posY = -1;
drawPiece(currentPiece, posX, posY);

function update() {
  // Check if the next move down causes a collision
  if (!collision(currentPiece, posX, posY)) {
    posY++; // move down
  } else {
    // Merge piece into board and spawn new one
    mergePiece(currentPiece, posX, posY);
    currentPiece = randomPiece();
    posX = 3;
    posY = -1;
  }
  drawBoard();
  drawPiece(currentPiece, posX, posY);
}

function gameLoop() {
  drawBoard();
  drawPiece(currentPiece, posX, posY);
  setInterval(() => {
    update();
  }, 500);
}

function collision(piece, offsetX, offsetY) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newY = y + offsetY + 1;
        const newX = x + offsetX;
        // Check bottom of board
        if (newY >= ROWS) {
          return true;
        }
        // Check collision with existing blocks
        if (board[newY][newX] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function collisionX(piece, offsetX, offsetY, dir) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newY = y + offsetY + 1;
        const newX = x + offsetX + 1;
        const nX = x + offsetX - 1;
        const nY = y + offsetY - 1;
        //right
        if (newX >= COLS && dir === "right") {
          return true;
        }
        // Check collision with existing blocks
        //left
        if (nX <= -1 && dir === "left") {
          return true;
        }
      }
    }
  }
  return false;
}

function mergePiece(piece, offsetX, offsetY) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        board[y + offsetY][x + offsetX] = piece[y][x];
      }
    }
  }
}
//move left
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      c = rotatePiece(currentPiece);
      currentPiece = c;
      drawBoard();
      drawPiece(currentPiece, posX, posY);
      break;
    case "ArrowDown":
      break;
    case "ArrowRight":
      if (!collisionX(currentPiece, posX, posY, "right")) {
        posX++;
        drawBoard();
        drawPiece(currentPiece, posX, posY);
      }
      break;
    case "ArrowLeft":
      if (!collisionX(currentPiece, posX, posY, "left")) {
        posX--;
        drawBoard();
        drawPiece(currentPiece, posX, posY);
      }
      break;
  }
});
gameLoop();
//when moving left and right it doesn't check fo obsticles
