import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { Piece } from "../Types";
import { moveBottom } from "./pieceMoves";

export function initMatrix(): number[][] {
  var matrix: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    matrix[y] = new Array(10).fill(0);
  }
  return matrix;
}

export function initPiece(nb: number): Piece {
  const piece: Piece = {
    name: nb,
    rotation: 0,
    pos: { x: 3, y: 0 },
  };
  return piece;
}

export function initQueue(randomGen: seedrandom.PRNG): Piece[] {
  let queue: Piece[] = [];
  queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  return queue;
}

export function addPieceToBoard(matrix: number[][], piece: Piece): number[][] {
  let matrixToPrint = JSON.parse(JSON.stringify(matrix));
  for (let j = 0; j < piecesList[piece.name % 7][piece.rotation].length; j++) {
    for (
      let i = 0;
      i < piecesList[piece.name % 7][piece.rotation][j].length;
      i++
    ) {
      if (piecesList[piece.name % 7][piece.rotation][j][i] === 0) {
        continue;
      }
      matrixToPrint[piece.pos.y + j][piece.pos.x + i] = piece.name + 1;
    }
  }
  return matrixToPrint;
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

export const getPoints = (level: number, nbCompletLine: number) => {
  switch (nbCompletLine) {
    case 1:
      return 40 * (level + 1);
    case 2:
      return 100 * (level + 1);
    case 3:
      return 300 * (level + 1);
    case 4:
      return 1200 * (level + 1);
    default:
      return 0;
  }
};

export const genShadow = (gameBoard: number[][]) => {
  var genShadow = new Array(10).fill(20);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      if (gameBoard[y][x] == 0) {
        genShadow[x]--;
      } else {
        break;
      }
    }
  }
  return genShadow;
};
