import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { gameSlice } from "./GameReducer";
import { socketSlice } from "./SocketReducer";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished: boolean =
      socket && store.getState().socket.isConnected;

    if (socketSlice.actions.startConnecting.match(action)) {
      socket = io();

      socket.on("connect", () => {
        store.dispatch(socketSlice.actions.connectionEstablished());
      });

      socket.on("swap", (txt_var: string) => {
        console.log("From server: ", txt_var);
      });
    }

    if (gameSlice.actions.swapPiece.match(action) && isConnectionEstablished) {
      socket.emit("swap", "swap pressed");
    }

    next(action);
  };
};
export default socketMiddleware;
