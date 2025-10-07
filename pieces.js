//pices are 4x4 matrices
const pieces = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
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

function randomPiece() {
  let rand = Math.floor(Math.random() * 7);
  switch (rand) {
    case 0:
      return pieces.I;
    case 1:
      return pieces.J;
    case 2:
      return pieces.L;
    case 3:
      return pieces.O;
    case 4:
      return pieces.S;
    case 5:
      return pieces.T;
    case 6:
      return pieces.Z;
  }
}
