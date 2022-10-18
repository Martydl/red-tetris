import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
  },
});

export default socketSlice.reducer;
