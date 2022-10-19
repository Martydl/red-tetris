import { piecesList } from "../Consts";
import { Coords, Piece } from "../Types";
import { checkCollisions } from "./Utils";

// called every seconds
export function moveSecond(
  matrix: number[][],
  piece: Piece,
  defaultDelay: number,
  setDelayCbk: (delay: number) => void
): Coords | undefined {
  setDelayCbk(defaultDelay);
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
  } else {
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
  } else {
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
}
