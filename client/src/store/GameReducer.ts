import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { piecesList } from "../Consts";
import { checkCollisions } from "../game/PieceMoves";
import {
  initPiece,
  getPoints,
  initMatrix,
  initQueue,
  updatePrintBoard,
  genShadow,
  addPieceToBoard,
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
  gameOn: boolean;
}

const randomGen: seedrandom.PRNG = seedrandom();

const initialState: GameState = {
  gameOn: true,
  gameBoard: initMatrix(),
  printBoard: initMatrix(),
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

const setDelay = (state: GameState, action: PayloadAction<number>) => {
  state.currentDelay = action.payload;
};

const nextPiece = (state: GameState) => {
  if (
    checkCollisions(state.gameBoard, piecesList[state.queue[0].name][0], 3, 0)
  ) {
    state.currentPiece = state.queue[0];
    state.queue.shift();
    state.queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  } else {
    state.gameOn = false;
    console.log("Game Over:", !state.gameOn);
  }
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

// const updateGameBoard = (
//   state: GameState,
//   action: PayloadAction<number[][]>
// ): void => {
//   state.gameBoard = action.payload;
//   checkBoardLines(state);
//   nextPiece(state);
//   state.shadow = genShadow(state.gameBoard);
//   state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
// };

const setGameBoardMatrix = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  if (JSON.stringify(state.gameBoard[0]) === "[0,0,0,0,0,0,0,0,0,0]") {
    state.gameBoard = action.payload;
    if (
      !checkCollisions(
        state.gameBoard,
        piecesList[state.currentPiece.name][state.currentPiece.rotation],
        state.currentPiece.pos.x,
        state.currentPiece.pos.y
      )
    ) {
      state.currentPiece.pos.y--;
      state.gameBoard = addPieceToBoard(state.gameBoard, state.currentPiece);
      nextPiece(state);
    }
    checkBoardLines(state);
    state.shadow = genShadow(state.gameBoard);
    state.printBoard = updatePrintBoard(state.gameBoard, state.currentPiece);
    console.log("Plus 1 malus, tu vas faire quoi ?");
  } else {
    state.gameOn = false;
    console.log(
      "Pas assez de place pour mettre un malus, déso, t'es deja au fond du trou"
    );
  }
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
    setDelay,
    swapPiece,
    checkBoardLines,
    setGameBoardMatrix,
  },
});

export default gameSlice.reducer;
