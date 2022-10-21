import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectionState {
  isConnectedToSocket: boolean;
  isConnectingToSocket: boolean;
  isConnectedToRoom: boolean;
  isConnectingToRoom: boolean;
  roomName?: string;
  playerName: string;
  roomList: { [key: string]: { playerNb: number; gameOn: boolean } };
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
      action: PayloadAction<{
        [key: string]: { playerNb: number; gameOn: boolean };
      }>
    ) => {
      state.roomList = action.payload;
    },
    editRoom: (
      state: ConnectionState,
      action: PayloadAction<[string, { playerNb: number; gameOn: boolean }]>
    ) => {
      const [id, room] = action.payload;
      state.roomList[id] = room;
    },
    delRoom: (state: ConnectionState, action: PayloadAction<string>) => {},
  },
});

export default connectionSlice.reducer;
