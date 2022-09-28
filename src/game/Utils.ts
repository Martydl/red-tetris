import { Piece } from "../Types";

export function initMatrix(): number[][] {
  var matrix: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    matrix[y] = new Array(10).fill(0);
  }
  return matrix;
}

export function createPiece(nb: number): Piece {
  const piece: Piece = {
    name: nb,
    rotation: 0,
    x: 3,
    y: 0,
  };
  return piece;
}
