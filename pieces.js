//pices are 4x4 matrices
const pieces = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
  ],
  z: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

//rotate the piece clock wise
function rotatePiece(p) {
  const size = p.length; // should be 4
  const res = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      res[j][size - 1 - i] = p[i][j];
    }
  }
  return res;
}
