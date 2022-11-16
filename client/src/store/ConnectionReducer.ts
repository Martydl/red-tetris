import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectionState {
  isConnectedToSocket: boolean;
  isConnectingToSocket: boolean;
  socketId: string;
  isConnectedToRoom: boolean;
  isConnectingToRoom: boolean;
  roomName?: string;
  playerName: string;
  roomList: { [key: string]: { playerNb: number; gameOn: boolean } };
  bestScore: number;
  routingBuffer?: string;
}

const initialState: ConnectionState = {
  isConnectedToSocket: false,
  isConnectingToSocket: false,
  socketId: "undef",
  isConnectedToRoom: false,
  isConnectingToRoom: false,
  roomName: undefined,
  playerName: "Guest",
  roomList: {},
  bestScore: 42, // a aller chercher dans les cookies au lancement de l'app et ecrire dans les cookies a la fermeture
};

export const connectionSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnectingToSocket: (state: ConnectionState) => {
      state.isConnectingToSocket = true;
    },
    socketConnectionEstablished: (
      state: ConnectionState,
      action: PayloadAction<string>
    ) => {
      state.isConnectedToSocket = true;
      state.isConnectingToSocket = true;
      state.socketId = action.payload;
    },
    startConnectingToRoom: (
      state: ConnectionState,
      _action: PayloadAction<string>
    ) => {
      state.isConnectingToRoom = true;
    },
    roomConnectionEstablished: (
      state: ConnectionState,
      action: PayloadAction<string>
    ) => {
      state.isConnectedToRoom = true;
      state.roomName = action.payload;
    },
    roomDisconnect: (state: ConnectionState) => {
      state.isConnectedToRoom = false;
      state.isConnectingToRoom = false;
      state.roomName = undefined;
    },
    setPlayerName: (state: ConnectionState, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
    setRoomList: (
      state: ConnectionState,
      action: PayloadAction<{
        [key: string]: { playerNb: number; gameOn: boolean };
      }>
    ) => {
      state.roomList = action.payload;
    },
    setRoutingBuffer: (
      state: ConnectionState,
      action: PayloadAction<string | undefined>
    ) => {
      state.routingBuffer = action.payload;
    },
    setBestScore: (state: ConnectionState, action: PayloadAction<number>) => {
      state.bestScore = action.payload;
    },
    computeBestScore: (
      state: ConnectionState,
      action: PayloadAction<[number, boolean]>
    ) => {
      const [newScore, acceleration] = action.payload;
      if (acceleration && newScore > state.bestScore) {
        state.bestScore = newScore;
        localStorage.setItem("bestScore", String(newScore));
      }
    },
  },
});

export default connectionSlice.reducer;
