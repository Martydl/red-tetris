import { piecesList } from "../Consts";
import { Coords, Piece } from "../Types";

// check if piece can be place with couple x/y in matrix. [true: can]/[false: can't] be place
export function checkCollisions(
  matrix: number[][],
  piece: number[][],
  x: number,
  y: number
): boolean {
  for (let j = 0; j < piece.length; j++) {
    for (let i = 0; i < piece[j].length; i++) {
      if (piece[j][i] === 0) {
        continue;
      } else if (
        y + j >= 20 ||
        x + i >= 10 ||
        y + j < 0 ||
        x + i < 0 ||
        matrix[y + j][x + i] !== 0
      ) {
        return false;
      }
    }
  }
  return true;
}

// called every seconds
export function moveSecond(
  matrix: number[][],
  piece: Piece,
  setDelayCbk: (delay: number) => void
): Coords | undefined {
  setDelayCbk(1000);
  let pos: Coords = { ...piece.pos };
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      pos.x,
      pos.y + 1
    )
  ) {
    pos.y++;
    return pos;
  } else {
    // save piece in matrix and create new piece
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyLeft is pressed
export function moveLeft(matrix: number[][], piece: Piece): Coords | undefined {
  let pos = { ...piece.pos };
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      pos.x - 1,
      pos.y
    )
  ) {
    pos.x--;
    return pos;
  } else {
    // Doesn't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyRight is pressed
export function moveRight(
  matrix: number[][],
  piece: Piece
): Coords | undefined {
  let pos = { ...piece.pos };
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      pos.x + 1,
      pos.y
    )
  ) {
    pos.x++;
    return pos;
    // printMatrix(matrix, piece);
  } else {
    // Doesn't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyUp is pressed
export function moveUp(matrix: number[][], piece: Piece): number | undefined {
  let nextRotation = (piece.rotation + 1) % 4;
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][nextRotation],
      piece.pos.x,
      piece.pos.y
    )
  ) {
    return nextRotation;
    // printMatrix(matrix, piece);
  } else {
    // Doesn't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyEsp is pressed
export function moveBottom(matrix: number[][], piece: Piece): Coords {
  let pos: Coords = { ...piece.pos };
  while (
    checkCollisions(
      matrix,
      piecesList[piece.name % 7][piece.rotation],
      pos.x,
      pos.y + 1
    )
  ) {
    pos.y++;
  }
  return pos;
  // save piece in matrix and create new piece
  // printMatrix(matrix, piece);
}
