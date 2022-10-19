import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initPiece,
  getPoints,
  initBoard,
  initQueue,
  updatePrintBoard,
  checkCollisions,
} from "../game/Utils";
import { piecesList } from "../Consts";
import { Coords, Piece } from "../Types";
import seedrandom from "seedrandom";

export interface GameState {
  gameOn: boolean;
  gameBoard: number[][];
  printBoard: number[][];
  currentPiece: Piece;
  queue: Piece[];
  shadow: number[];
  completedLine: number;
  level: number;
  score: number;
  currentDelay: number;
  defaultDelay: number;
  acceleration: number;
  linesToBlock: number;
}

const randomGen: seedrandom.PRNG = seedrandom();

const initialState: GameState = {
  gameOn: true,
  gameBoard: initBoard(),
  printBoard: initBoard(),
  // currentPiece: initPiece(Math.round(randomGen() * 100) % 7),
  currentPiece: initPiece(1),
  queue: initQueue(randomGen),
  shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  completedLine: 0,
  level: 0,
  score: 0,
  currentDelay: 1000,
  defaultDelay: 1000,
  acceleration: 1.15,
  linesToBlock: 0,
};

const gameOver = (state: GameState) => {
  state.gameOn = false;
};

const setGameBoard = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  state.gameBoard = action.payload;
};

const setPrintBoard = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  state.printBoard = action.payload;
};

const setCurrentPiece = (
  state: GameState,
  action: PayloadAction<Piece>
): void => {
  state.currentPiece = action.payload;
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

const setQueue = (state: GameState, action: PayloadAction<Piece[]>): void => {
  state.queue = action.payload;
};

const updateQueue = (state: GameState, action: PayloadAction<Piece>): void => {
  state.queue.shift();
  state.queue.push(action.payload);
};

const setShadow = (state: GameState, action: PayloadAction<number[]>): void => {
  state.shadow = action.payload;
};

const setCompletedLines = (
  state: GameState,
  action: PayloadAction<number>
): void => {
  const newLines = action.payload;
  const oldLevel = state.level;
  state.completedLine += newLines;
  state.score = getPoints(state.level, newLines);
  state.level = Math.floor(state.completedLine / 10);
  if (state.level <= 9 && state.level != oldLevel && state.currentDelay > 1) {
    state.defaultDelay -= 50 * state.acceleration ** state.level;
    if (state.defaultDelay < 100) {
      state.defaultDelay = 100;
    }
  }
};

const addLinesToBlock = (state: GameState, action: PayloadAction<number>) => {
  state.linesToBlock += action.payload;
};

const subLinesToBlock = (state: GameState, action: PayloadAction<number>) => {
  state.linesToBlock -= action.payload;
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
  }
  state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameOver,
    setGameBoard,
    setPrintBoard,
    setCurrentPiece,
    setCurrentPieceCoords,
    setCurrentPieceRotation,
    setQueue,
    updateQueue,
    setShadow,
    setCompletedLines,
    addLinesToBlock,
    subLinesToBlock,
    setDelay,
    swapPiece,
  },
});

export default gameSlice.reducer;
