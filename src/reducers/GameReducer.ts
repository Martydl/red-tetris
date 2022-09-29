import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { checkCollisions, moveBottom } from "../game/pieceMoves";
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
  delay: number;
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
  delay: 1000,
  completedLine: 0,
  level: 0,
  score: 0,
  shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const checkBoardLines = (state: GameState) => {
  let nbCompletLine: number = 0;
  for (let y = 0; y < state.gameBoard.length; y++) {
    if (!state.gameBoard[y].includes(0)) {
      state.gameBoard.splice(y, 1);
      state.gameBoard.unshift(new Array(10).fill(0));
      nbCompletLine++;
    }
  }
  state.completedLine += nbCompletLine;
  state.level = Math.floor(state.completedLine / 10);
  state.score += getPoints(state.level, nbCompletLine);
  if (state.delay != 1) {
    state.delay = 1001 - state.level * 100;
  }
  console.log(state.completedLine, state.level, state.score);
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
  state.delay = action.payload;
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
  },
});

export default gameSlice.reducer;
