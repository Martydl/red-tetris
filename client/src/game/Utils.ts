import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { Piece } from "../Types";
import { moveBottom } from "./PieceMoves";

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

export function createPiece(randomGen: seedrandom.PRNG): Piece {
  const nb = Math.round(randomGen() * 100) % 7;
  const piece: Piece = {
    name: nb,
    rotation: 0,
    pos: { x: 3, y: 0 },
  };
  return piece;
}

export function initQueue(randomGen: seedrandom.PRNG): Piece[] {
  let queue: Piece[] = [];
  // queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  // queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  // queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  queue.push(initPiece(2));
  queue.push(initPiece(3));
  queue.push(initPiece(4));
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

export const genShadow = (gameBoard: number[][]): number[] => {
  var shadow: number[] = new Array(10).fill(20);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      if (gameBoard[y][x] == 0) {
        shadow[x]--;
      } else {
        break;
      }
    }
  }
  return shadow;
};

export const getMalusRow = (
  matrix: number[][],
  currentPiece: Piece
): number[][] => {
  matrix.shift();
  matrix.push(new Array(10).fill(-1));
  return matrix;
};

export const getShadow = (shadow: number[]): number[][] => {
  var realOne: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    realOne[y] = new Array(10);
    for (let x = 0; x < 10; x++) {
      realOne[y][x] = y < 20 - shadow[x] ? 0 : 15;
    }
  }
  return realOne;
};
