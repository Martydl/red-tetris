import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { ClientMessages } from "../../../common/Consts";
import { gameSlice } from "./GameReducer";
import { connectionSlice } from "./ConnectionReducer";
// import { roomSlice } from "./RoomReducer";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished: boolean =
      socket && store.getState().connection.isConnectedToSocket;

    if (connectionSlice.actions.startConnectingToSocket.match(action)) {
      socket = io();

      socket.on("connect", () => {
        store.dispatch(connectionSlice.actions.socketConnectionEstablished());
      });
    }

    // Events received from the server
    // socket.on("event", () => {
    //   dispatch(event);
    // });

    // Events sent to the server
    if (
      connectionSlice.actions.startConnectingToRoom.match(action) &&
      isConnectionEstablished
    ) {
      console.log(action.payload);
      socket.emit(ClientMessages.JOIN_ROOM, [
        action.payload,
        store.getState().connection.playerName,
      ]);
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

    // if (roomSlice.actions.startGame.match(action) && isConnectionEstablished) {
    //   socket.emit(ClientMessages.START_GAME);
    // }

    // if (roomSlice.actions.endGame.match(action) && isConnectionEstablished) {
    //   socket.emit(ClientMessages.END_GAME);
    // }

    if (
      gameSlice.actions.setSocketTest.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit("numpadSub", "NumpadSubtract txt");
    }

    next(action);
  };
};
export default socketMiddleware;
