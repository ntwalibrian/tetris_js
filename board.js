const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30; //pixels

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

const board = createBoard();
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

const canvaPreview = document.getElementById("preview");
const cty = canvaPreview.getContext("2d");

const canvaLines = document.getElementById("lineCount");
const ctz = canvaLines.getContext("2d");

// Set the canvas size to match the board
canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

canvaPreview.width = 4 * BLOCK_SIZE;
canvaPreview.height = 4 * BLOCK_SIZE;

canvaLines.width = 6 * BLOCK_SIZE;
canvaLines.height = 3 * BLOCK_SIZE;

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

let preview = randomPiece();
let currentPiece = randomPiece();
let lineCount = 0;
let posX = 3;
let posY = 0;
// drawPiece(currentPiece, posX, posY);

function previewBoard() {
  cty.fillStyle = "#000";
  cty.fillRect(0, 0, canvaPreview.width, canvaPreview.height);
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      cty.strokeStyle = "#f7f1f1";
      cty.lineWidth = 1;
      cty.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
  for (let y = 0; y < preview.length; y++) {
    for (let x = 0; x < preview[y].length; x++) {
      if (preview[y][x] != 0) {
        cty.fillStyle = "blue";
        cty.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        cty.strokeStyle = "#f7f1f1";
        cty.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function countBoard() {
  ctz.fillStyle = "#f5f3f3ff";
  ctz.fillRect(0, 0, canvaLines.width, canvaLines.height);
  ctz.font = "20px Arial";
  ctz.strokeText(`Lines: ${lineCount}`, 30, 45);
}

function update() {
  // Check if the next move down causes a collision
  if (!collision(currentPiece, posX, posY)) {
    posY++; // move down
  } else {
    // Merge piece into board and spawn new one
    mergePiece(currentPiece, posX, posY);
    clearFullLines();
    // console.log(lineCount)
    currentPiece = preview;
    preview = randomPiece();
    posX = 3;
    posY = 0;
  }
  drawBoard();
  previewBoard();
  drawPiece(currentPiece, posX, posY);
}

function gameLoop() {
  drawBoard();
  countBoard();
  previewBoard();
  drawPiece(currentPiece, posX, posY);
  setInterval(() => {
    update();
  }, 500);
}

function clearFullLines() {
  // Start from bottom to top
  for (let y = ROWS - 1; y >= 0; y--) {
    // Check if row is full (no zero values)
    if (board[y].every((cell) => cell !== 0)) {
      // Remove the filled line
      board.splice(y, 1);
      // Add an empty row at the top
      board.unshift(Array(COLS).fill(0));
      // Move the index back to recheck this row (because all rows shifted down)
      y++;
      lineCount++;
      countBoard();
    }
  }
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
  const dx = dir === "right" ? 1 : -1;
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newX = x + offsetX + dx;
        const newY = y + offsetY;

        if (newX <= -1 || newX >= COLS) {
          return true;
        }

        if (newY >= 0 && board[newY][newX] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function collisionRotate(piece, offsetX, offsetY) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newX = x + offsetX;
        const newY = y + offsetY;

        // Check bounds
        if (newX < -1 || newX >= COLS || newY >= ROWS) {
          return true;
        }

        // Check collision with existing blocks
        if (newY >= 0 && board[newY][newX] !== 0) {
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
      if (!collisionRotate(c, posX, posY)) {
        currentPiece = c;
        drawBoard();
        drawPiece(currentPiece, posX, posY);
      }

      break;
    case "ArrowDown":
      if (!collision(currentPiece, posX, posY)) {
        posY++;
        drawBoard();
        drawPiece(currentPiece, posX, posY);
      }
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
