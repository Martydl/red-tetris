import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Opponent {
  playerName: string;
  shadow: number[];
  gameOver: boolean;
  // board: number[][]; // Show remaining players boards when not playing / dead ?
}

export interface RoomState {
  roomName?: string;
  leaderId?: string;
  gameOn: boolean;
  opponents: { [id: string]: Opponent }; // from server, needs to send only playing players, not spectators
}

const initialState: RoomState = {
  roomName: undefined,
  leaderId: undefined,
  gameOn: false,
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
    startGame: (state: RoomState) => {
      state.gameOn = true;
    },
    endGame: (state: RoomState) => {
      state.gameOn = false;
    },
    setLeaderId: (state: RoomState, action: PayloadAction<string>) => {
      state.leaderId = action.payload;
    },
    editOpponent: (
      state: RoomState,
      action: PayloadAction<[string, Opponent]>
    ) => {
      const [id, opponent] = action.payload;
      state.opponents[id] = opponent;
    },
    delOpponent: (state: RoomState, action: PayloadAction<string>) => {},
  },
});

export default roomSlice.reducer;
