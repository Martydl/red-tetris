import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlayerStatus, Coords, Piece } from "../Types";
import { piecesList } from "../Consts";

import { checkCollisions, updatePrintBoard } from "../utils/Board";
import { initBoard, initPiece, initQueue } from "../utils/Init";
import { getPoints } from "../utils/Score";

export interface GameState {
  gameOn: PlayerStatus;
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

const initialState: GameState = {
  gameOn: PlayerStatus.WAITING,
  gameBoard: initBoard(),
  printBoard: initBoard(),
  currentPiece: initPiece(0),
  queue: [],
  shadow: new Array(10).fill(0),
  completedLine: 0,
  level: 0,
  score: 0,
  currentDelay: 1000,
  defaultDelay: 1000,
  acceleration: 1.15,
  linesToBlock: 0,
};

const resetGameState = () => initialState;

const setGameOn = (state: GameState) => {
  state.gameOn = PlayerStatus.ALIVE;
};

const gameOver = (state: GameState) => {
  state.gameOn = PlayerStatus.DEAD;
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

const updateQueue = (state: GameState, action: PayloadAction<Piece>): void => {
  state.queue.shift();
  state.queue.push(action.payload);
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

const initPieces = (state: GameState, action: PayloadAction<number[]>) => {
  state.currentPiece = initPiece(action.payload[0]);
  state.queue = initQueue(action.payload);
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
  state.score += getPoints(state.level, newLines);
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

const setAcceleration = (state: GameState, action: PayloadAction<boolean>) => {
  state.acceleration = action.payload ? 1.15 : 0;
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGameState,
    setGameOn,
    gameOver,
    setGameBoard,
    setPrintBoard,
    setCurrentPiece,
    setCurrentPieceCoords,
    setCurrentPieceRotation,
    updateQueue,
    swapPiece,
    initPieces,
    setShadow,
    setCompletedLines,
    addLinesToBlock,
    subLinesToBlock,
    setDelay,
    setAcceleration,
  },
});

export default gameSlice.reducer;
