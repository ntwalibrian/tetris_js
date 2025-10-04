const ROWS = 20;
const COLUMS = 10;

function createBoard() {
  return Array.from({ length: ROWS }, Array(COLUMS).fill(0));
}
