import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { checkCollisions } from "../game/pieceMoves";
import {
  initPiece,
  getPoints,
  initMatrix,
  initQueue,
  updatePrintBoard,
  genShadow,
} from "../game/Utils";
import { Coords, Piece } from "../Types";

export interface GameState {
  gameBoard: number[][];
  printBoard: number[][];
  currentPiece: Piece;
  queue: Piece[];
  currentDelay: number;
  defaultDelay: number;
  acceleration: number;
  completedLine: number;
  level: number;
  score: number;
  shadow: number[];
}

const randomGen: seedrandom.PRNG = seedrandom();

const initialState: GameState = {
  gameBoard: initMatrix(),
  printBoard: initMatrix(),
  currentPiece: initPiece(Math.round(randomGen() * 100) % 7),
  queue: initQueue(randomGen),
  currentDelay: 1000,
  defaultDelay: 1000,
  acceleration: 1.15,
  completedLine: 0,
  level: 0,
  score: 0,
  shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

//tmp set malusRow at -1. Can be changed if needed
const getMalusRow = (state: GameState, numberLine: number) => {
  if (numberLine > 0) {
    for(let i=0; i < numberLine; i++) {
      state.gameBoard.shift();
      state.gameBoard.push(new Array(10).fill(-1));
    }
  }
}

const checkBoardLines = (state: GameState) => {
  let nbCompletLine: number = 0;
  let oldLevel = state.level;
  for (let y = 0; y < state.gameBoard.length; y++) {
    if (!state.gameBoard[y].includes(0) && !state.gameBoard[y].includes(-1)) {
      state.gameBoard.splice(y, 1);
      state.gameBoard.unshift(new Array(10).fill(0));
      nbCompletLine++;
    }
  }
  getMalusRow(state, nbCompletLine); // May put this function at an other place
  state.completedLine += nbCompletLine;
  state.score += getPoints(state.level, nbCompletLine);
  state.level = Math.floor(state.completedLine / 10);
  if (state.level <= 9 && state.level != oldLevel && state.currentDelay > 1) {
    state.defaultDelay -= 50 * state.acceleration ** state.level;
    if (state.defaultDelay < 100) {
      state.defaultDelay = 100;
    }
  }
};

const nextPiece = (state: GameState) => {
  if (
    checkCollisions(state.gameBoard, piecesList[state.queue[0].name][0], 3, 0)
  ) {
    state.currentPiece = state.queue[0];
    state.queue.shift();
    state.queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  } else {
    console.log("Game Over");
  }
};

const updateGameBoard = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  state.gameBoard = action.payload;
  checkBoardLines(state);
  nextPiece(state);
  state.shadow = genShadow(state.gameBoard);
  state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
};

const setCurrentPieceCoords = (
  state: GameState,
  action: PayloadAction<Coords>
) => {
  state.currentPiece.pos = action.payload;
  state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
};

const setCurrentPieceRotation = (
  state: GameState,
  action: PayloadAction<number>
) => {
  state.currentPiece.rotation = action.payload;
  state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
};

const setDelay = (state: GameState, action: PayloadAction<number>) => {
  state.currentDelay = action.payload;
};

const swapPiece = (state: GameState) => {
  if (
    checkCollisions(
      state.gameBoard,
      piecesList[state.queue[0].name][state.queue[0].rotation],
      state.currentPiece.pos.x,
      state.currentPiece.pos.y
    )
  ) {
    [state.currentPiece.name, state.queue[0].name] = [
      state.queue[0].name,
      state.currentPiece.name,
    ];
    [state.currentPiece.rotation, state.queue[0].rotation] = [
      state.queue[0].rotation,
      state.currentPiece.rotation,
    ];
    console.log(state.queue[0].rotation);
  }
  state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameBoard,
    checkBoardLines,
    setCurrentPieceCoords,
    setCurrentPieceRotation,
    setDelay,
    swapPiece,
  },
});

export default gameSlice.reducer;
