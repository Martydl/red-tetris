import { Piece } from "../Types";
import { piecesList } from "../Consts";

import { moveBottom } from "./PieceMoves";

export function addPieceToBoard(board: number[][], piece: Piece): number[][] {
  let newBoard = JSON.parse(JSON.stringify(board));
  for (let j = 0; j < piecesList[piece.name % 7][piece.rotation].length; j++) {
    for (
      let i = 0;
      i < piecesList[piece.name % 7][piece.rotation][j].length;
      i++
    ) {
      if (piecesList[piece.name % 7][piece.rotation][j][i] === 0) {
        continue;
      }
      newBoard[piece.pos.y + j][piece.pos.x + i] = piece.name + 1;
    }
  }
  return newBoard;
}

export const updatePrintBoard = (
  gameMatrix: number[][],
  currentPiece: Piece
): number[][] => {
  let tmpMatrix = addPieceToBoard(gameMatrix, {
    ...currentPiece,
    name: currentPiece.name + 7,
    pos: moveBottom(gameMatrix, currentPiece),
  });
  return addPieceToBoard(tmpMatrix, currentPiece);
};

export function checkGameBoard(gameBoard: number[][]): [number[][], number] {
  let completedLines: number = 0;
  for (let y = 0; y < gameBoard.length; y++) {
    if (!gameBoard[y].includes(0) && !gameBoard[y].includes(-1)) {
      gameBoard.splice(y, 1);
      gameBoard.unshift(new Array(10).fill(0));
      completedLines++;
    }
  }
  return [gameBoard, completedLines];
}

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
