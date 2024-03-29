import { configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "./SocketMiddleware";
import rootReducer from "./RootReducer";

export const getStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(socketMiddleware);
    },
  });
