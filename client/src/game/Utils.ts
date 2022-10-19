import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { Piece } from "../Types";
import { moveBottom } from "./PieceMoves";

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

export const genFullShadow = (shadow: number[]): number[][] => {
  var fullShadow: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    fullShadow[y] = new Array(10);
    for (let x = 0; x < 10; x++) {
      fullShadow[y][x] = y < 20 - shadow[x] ? 0 : 15;
    }
  }
  return fullShadow;
};
