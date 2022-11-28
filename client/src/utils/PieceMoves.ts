import { Coords, Piece } from "../Types";
import { piecesList } from "../Consts";

import { checkCollisions } from "./Board";

export function moveSecond(
  matrix: number[][],
  piece: Piece
): Coords | undefined {
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
    return undefined;
  }
}

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
    return undefined;
  }
}

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
    return undefined;
  }
}

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
    return undefined;
  }
}

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
