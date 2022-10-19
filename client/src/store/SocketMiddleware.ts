import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { ClientMessages } from "../Consts";
import { gameSlice } from "./GameReducer";
import { connectionSlice } from "./ConnectionReducer";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished: boolean =
      socket && store.getState().socket.isConnected;

    if (connectionSlice.actions.startConnecting.match(action)) {
      socket = io();

      socket.on("connect", () => {
        store.dispatch(connectionSlice.actions.connectionEstablished());
      });
    }

    if (gameSlice.actions.setShadow.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.NEW_SHADOW, action.payload);
    }

    if (
      gameSlice.actions.setCompletedLines.match(action) &&
      isConnectionEstablished
    ) {
      const lines: number = action.payload;
      if (lines > 1) {
        console.log("ici:", lines);
        socket.emit(ClientMessages.LINES_DESTROYED, lines - 1);
      }
    }

    if (gameSlice.actions.gameOver.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.PLAYER_GAME_OVER);
    }

    next(action);
  };
};
export default socketMiddleware;
