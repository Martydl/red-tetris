import { piecesList } from "../Consts";
import { Piece } from "../Types";

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
): Piece | undefined {
  setDelayCbk(1000);
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      piece.x,
      piece.y + 1
    )
  ) {
    piece.y++;
    return { ...piece };
  } else {
    // save piece in matrix and create new piece
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyLeft is pressed
export function moveLeft(matrix: number[][], piece: Piece): Piece | undefined {
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      piece.x - 1,
      piece.y
    )
  ) {
    piece.x--;
    return { ...piece };
  } else {
    // Don't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyRight is pressed
export function moveRight(matrix: number[][], piece: Piece): Piece | undefined {
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][piece.rotation],
      piece.x + 1,
      piece.y
    )
  ) {
    piece.x++;
    return { ...piece };
    // printMatrix(matrix, piece);
  } else {
    // Don't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyUp is pressed
export function moveUp(matrix: number[][], piece: Piece): Piece | undefined {
  let nextRotation = (piece.rotation + 1) % 4;
  if (
    checkCollisions(
      matrix,
      piecesList[piece.name][nextRotation],
      piece.x,
      piece.y
    )
  ) {
    piece.rotation = nextRotation;
    return { ...piece };
    // printMatrix(matrix, piece);
  } else {
    // Don't do shit. If he's dumb enough to try this. he wouldn't win. GO KILL HIM
    console.log("Ah ok, t'es comme ca toi, petit chenapan");
    return undefined;
  }
}

// called everytime KeyEsp is pressed
export function moveBottom(matrix: number[][], piece: Piece): Piece {
  while (
    checkCollisions(
      matrix,
      piecesList[piece.name % 7][piece.rotation],
      piece.x,
      piece.y + 1
    )
  ) {
    piece.y++;
  }
  return { ...piece };
  // save piece in matrix and create new piece
  // printMatrix(matrix, piece);
}
