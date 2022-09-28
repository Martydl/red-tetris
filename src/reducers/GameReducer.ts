import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import seedrandom from "seedrandom";
import { createPiece, initMatrix } from "../game/Utils";
import { Piece } from "../Types";

interface GameState {
  gameMatrix: number[][];
  printMatrix: number[][];
  currentPiece: Piece;
}

const randomGen: seedrandom.PRNG = seedrandom("dildo");

const initialState: GameState = {
  gameMatrix: initMatrix(),
  printMatrix: initMatrix(),
  currentPiece: createPiece(Math.round(randomGen() * 100) % 7),
};

const setGameMatrix = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  state.gameMatrix = action.payload;
};

const setPrintMatrix = (
  state: GameState,
  action: PayloadAction<number[][]>
): void => {
  state.printMatrix = action.payload;
};

const checkMatrixLines = (state: GameState) => {
  for (let y = 0; y < state.gameMatrix.length; y++) {
    if (!state.gameMatrix[y].includes(0)) {
      state.gameMatrix.splice(y, 1);
      state.gameMatrix.unshift(new Array(10).fill(0));
    }
  }
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameMatrix,
    setPrintMatrix,
    checkMatrixLines,
  },
});

export default gameSlice.reducer;
