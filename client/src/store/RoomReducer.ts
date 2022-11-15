import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerStatus } from "../Consts";

export interface Opponent {
  playerName: string;
  shadow: number[];
  status: PlayerStatus;
  // board: number[][]; // Show remaining players boards when not playing / dead ?
}

export interface RoomState {
  roomName: string;
  leaderId: string;
  startingGame: boolean;
  gameOn: boolean;
  acceleration: boolean;
  opponents: { [id: string]: Opponent }; // from server, needs to send only playing players, not spectators
}

const initialState: RoomState = {
  roomName: "undef",
  leaderId: "undef",
  startingGame: false,
  gameOn: false,
  acceleration: true,
  opponents: {},
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    resetRoom: (state: RoomState) => {
      state = initialState;
    },
    initRoom: (
      state: RoomState,
      action: PayloadAction<{
        roomName: string;
        leaderId: string;
        opponents: { [id: string]: Opponent };
        gameOn: boolean;
      }>
    ) => {
      state.roomName = action.payload.roomName;
      state.leaderId = action.payload.leaderId;
      state.opponents = action.payload.opponents;
      state.gameOn = action.payload.gameOn;
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
        state.opponents[id].shadow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
  },
});

export default roomSlice.reducer;
