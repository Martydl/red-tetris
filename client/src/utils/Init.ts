import { Piece } from "../Types";

export function initBoard(): number[][] {
  var board: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    board[y] = new Array(10).fill(0);
  }
  return board;
}

export function initPiece(nb: number): Piece {
  const piece: Piece = {
    name: nb,
    rotation: 0,
    pos: { x: 3, y: 0 },
  };
  return piece;
}

export function initQueue(piecesNames: number[]): Piece[] {
  let queue: Piece[] = [];
  queue.push(initPiece(piecesNames[1]));
  queue.push(initPiece(piecesNames[2]));
  queue.push(initPiece(piecesNames[3]));
  return queue;
}
