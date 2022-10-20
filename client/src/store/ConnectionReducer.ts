import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectionState {
  isConnectedToSocket: boolean;
  isConnectingToSocket: boolean;
  isConnectedToRoom: boolean;
  isConnectingToRoom: boolean;
  roomName?: string;
  playerName: string;
  roomList: { [id: string]: { name: string; player: number } };
}

const initialState: ConnectionState = {
  isConnectedToSocket: false,
  isConnectingToSocket: false,
  isConnectedToRoom: false,
  isConnectingToRoom: false,
  roomName: undefined,
  playerName: "Guest",
  roomList: {},
};

export const connectionSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnectingToSocket: (state: ConnectionState) => {
      state.isConnectingToSocket = true;
    },
    socketConnectionEstablished: (state: ConnectionState) => {
      state.isConnectedToSocket = true;
      state.isConnectingToSocket = true;
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
      action: PayloadAction<{ [id: string]: { name: string; player: number } }>
    ) => {
      state.roomList = action.payload;
    },
    editRoom: (
      state: ConnectionState,
      action: PayloadAction<[string, { name: string; player: number }]>
    ) => {
      const [id, room] = action.payload;
      state.roomList[id] = room;
    },
    delRoom: (state: ConnectionState, action: PayloadAction<string>) => {},
  },
});

export default connectionSlice.reducer;
