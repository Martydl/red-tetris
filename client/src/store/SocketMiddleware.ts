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
        // socket.emit(ChatEvent.RequestAllMessages);
      });

      socket.on("swapped", (txt_var: string) => {
        console.log("txt_var");
      });
    }

    if (gameSlice.actions.swapPiece.match(action) && isConnectionEstablished) {
      console.log("ici");
      socket.emit("hello", "world");
    }

    // if (socketSlice.actions.submitMessage.match(action) && isConnectionEstablished) {
    //   socket.emit(ChatEvent.SendMessage, action.payload.content);
    // }

    next(action);
  };
};
export default socketMiddleware;
