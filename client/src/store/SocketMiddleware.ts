import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { ClientMessages, ServerMessages } from "../../../common/Consts";
import { gameSlice } from "./GameReducer";
import { connectionSlice } from "./ConnectionReducer";
import { Opponent, roomSlice } from "./RoomReducer";
import { initPiece } from "../game/Utils";

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

      // Events received from the server
      socket.on(
        ServerMessages.ROOM_INFO,
        (msg: [string, string, { [id: string]: Opponent }, boolean]) => {
          let [roomName, leaderId, opponents, gameOn] = msg;
          store.dispatch(
            roomSlice.actions.initRoom({
              roomName,
              leaderId,
              opponents,
              gameOn,
            })
          );
        }
      );

      socket.on(ServerMessages.LEADER_ID, (id: string) => {
        store.dispatch(roomSlice.actions.setLeaderId(id));
      });

      socket.on(ServerMessages.SEND_OPPONENT, (msg: [string, Opponent]) => {
        const [id, opponent] = msg;
        store.dispatch(roomSlice.actions.editOpponent([id, opponent]));
      });

      socket.on(ServerMessages.LINES_TO_BLOCK, (nb: number) => {
        store.dispatch(gameSlice.actions.addLinesToBlock(nb));
      });

      socket.on(ClientMessages.START_GAME, (piecesNames: number[]) => {
        store.dispatch(roomSlice.actions.startGame());
        store.dispatch(gameSlice.actions.initPieces(piecesNames));
      });

      socket.on(ClientMessages.GET_PIECE, (pieceName: number) => {
        store.dispatch(gameSlice.actions.updateQueue(initPiece(pieceName)));
        store.dispatch(gameSlice.actions.upPieceId());
      });
    }

    // Events sent to the server
    if (
      connectionSlice.actions.startConnectingToRoom.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(ClientMessages.JOIN_ROOM, [
        action.payload,
        store.getState().connection.playerName,
      ]);
      // tmp until answer from server
      store.dispatch(
        connectionSlice.actions.roomConnectionEstablished(action.payload)
      );
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
        socket.emit(ClientMessages.LINES_DESTROYED, lines - 1);
      }
    }

    if (gameSlice.actions.gameOver.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.PLAYER_GAME_OVER);
    }

    if (roomSlice.actions.startGame.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.START_GAME);
    }

    if (roomSlice.actions.endGame.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.END_GAME);
    }

    if (
      gameSlice.actions.setCurrentPiece.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(ClientMessages.GET_PIECE, [
        store.getState().room.roomName,
        store.getState().game.pieceId,
      ]);
    }

    next(action);
  };
};
export default socketMiddleware;
