import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectionState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: ConnectionState = {
  isEstablishingConnection: false,
  isConnected: false,
};

export const connectionSlice = createSlice({
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

export default connectionSlice.reducer;
