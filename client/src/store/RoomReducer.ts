import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PlayerStatus, Opponent } from "../Types";

export interface RoomState {
  roomName: string;
  leaderId: string;
  startingGame: boolean;
  gameOn: boolean;
  acceleration: boolean;
  opponents: { [id: string]: Opponent };
  winner: string;
  lastScore?: number;
}

const initialState: RoomState = {
  roomName: "undef",
  leaderId: "undef",
  startingGame: false,
  gameOn: false,
  acceleration: true,
  opponents: {},
  winner: "-",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    resetRoomState: () => initialState,
    initRoom: (
      state: RoomState,
      action: PayloadAction<{
        roomName: string;
        leaderId: string;
        opponents: { [id: string]: Opponent };
        gameOn: boolean;
        acceleration: boolean;
      }>
    ) => {
      state.roomName = action.payload.roomName;
      state.leaderId = action.payload.leaderId;
      state.opponents = action.payload.opponents;
      state.gameOn = action.payload.gameOn;
      state.acceleration = action.payload.acceleration;
    },
    lauchGame: (state: RoomState) => {
      state.startingGame = true;
    },
    startGame: (state: RoomState) => {
      state.gameOn = true;
    },
    endGame: (state: RoomState) => {
      state.gameOn = false;
    },
    setLeaderId: (state: RoomState, action: PayloadAction<string>) => {
      state.leaderId = action.payload;
    },
    addOpponent: (
      state: RoomState,
      action: PayloadAction<[string, Opponent]>
    ) => {
      const [id, opponent] = action.payload;
      state.opponents[id] = opponent;
    },
    editOpponentShadow: (
      state: RoomState,
      action: PayloadAction<[string, number[]]>
    ) => {
      const [id, shadow] = action.payload;
      state.opponents[id].shadow = shadow;
    },
    editOpponentGameStatus: (
      state: RoomState,
      action: PayloadAction<[string, PlayerStatus]>
    ) => {
      const [id, status] = action.payload;
      state.opponents[id].status = status;
    },
    resetOpponents: (state: RoomState) => {
      for (let id in state.opponents) {
        state.opponents[id].status = PlayerStatus.ALIVE;
        state.opponents[id].shadow = new Array(10).fill(0);
      }
    },
    delOpponent: (state: RoomState, action: PayloadAction<string>) => {
      delete state.opponents[action.payload];
    },
    toggleAcceleration: (state: RoomState) => {
      state.acceleration = !state.acceleration;
    },
    setAcceleration: (state: RoomState, action: PayloadAction<boolean>) => {
      state.acceleration = action.payload;
    },
    setWinner: (state: RoomState, action: PayloadAction<string>) => {
      state.winner = action.payload;
    },
    setLastScore: (
      state: RoomState,
      action: PayloadAction<number | undefined>
    ) => {
      state.lastScore = action.payload;
    },
  },
});

export default roomSlice.reducer;
