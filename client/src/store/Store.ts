import { configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "./socketMiddleware";
import rootReducer from "./RootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware);
  },
});
