import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { ClientMessages, ServerMessages } from "../../../common/Consts";
import { gameSlice } from "./GameReducer";
import { connectionSlice } from "./ConnectionReducer";
import { Opponent, roomSlice } from "./RoomReducer";
import { initPiece } from "../game/Utils";
import { PlayerStatus } from "../Consts";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished: boolean =
      socket && store.getState().connection.isConnectedToSocket;

    if (connectionSlice.actions.startConnectingToSocket.match(action)) {
      socket = io();

      socket.on(
        ServerMessages.ROOM_LIST,
        (arg: { [key: string]: { playerNb: number; gameOn: boolean } }) => {
          store.dispatch(connectionSlice.actions.setRoomList(arg));
        }
      );

      socket.on("connect", () => {
        store.dispatch(
          connectionSlice.actions.socketConnectionEstablished(socket.id)
        );
      });

      // Events received from the server
      socket.on(
        ServerMessages.ROOM_INFO,
        (msg: [string, string, { [id: string]: Opponent }, boolean]) => {
          let [roomName, leaderId, opponents, gameOn] = msg;
          store.dispatch(
            connectionSlice.actions.roomConnectionEstablished(roomName)
          );
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
        store.dispatch(roomSlice.actions.addOpponent([id, opponent]));
      });

      socket.on(ClientMessages.START_GAME, (piecesNames: number[]) => {
        console.log(piecesNames);
        store.dispatch(roomSlice.actions.startGame());
        store.dispatch(gameSlice.actions.initPieces(piecesNames));
        store.dispatch(
          gameSlice.actions.setAcceleration(store.getState().room.acceleration)
        );
      });

      socket.on(ClientMessages.GET_PIECE, (pieceName: number) => {
        console.log("ici");
        store.dispatch(gameSlice.actions.updateQueue(initPiece(pieceName)));
        store.dispatch(gameSlice.actions.upPieceId());
      });

      socket.on(ClientMessages.NEW_SHADOW, (arg: [string, number[]]) => {
        const [id, shadow] = arg;
        store.dispatch(roomSlice.actions.editOpponentShadow([id, shadow]));
      });

      socket.on("TOGGLE_ACCELERATION", (acceleration: boolean) => {
        store.dispatch(roomSlice.actions.setAcceleration(acceleration));
      });

      socket.on(ClientMessages.PLAYER_GAME_OVER, (id: string) => {
        store.dispatch(
          roomSlice.actions.editOpponentGameOn([id, PlayerStatus.DEAD])
        );
      });

      socket.on(ClientMessages.LINES_DESTROYED, (nb: number) => {
        store.dispatch(gameSlice.actions.addLinesToBlock(nb));
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
    }

    if (gameSlice.actions.setShadow.match(action) && isConnectionEstablished) {
      socket.emit(ClientMessages.NEW_SHADOW, [
        store.getState().connection.roomName,
        action.payload,
      ]);
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
      socket.emit(
        ClientMessages.PLAYER_GAME_OVER,
        store.getState().connection.roomName
      );
    }

    if (
      roomSlice.actions.toggleAcceleration.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit("TOGGLE_ACCELERATION", store.getState().connection.roomName);
    }

    if (roomSlice.actions.lauchGame.match(action) && isConnectionEstablished) {
      console.log("ici");
      socket.emit(
        ClientMessages.START_GAME,
        store.getState().connection.roomName
      );
    }

    if (roomSlice.actions.endGame.match(action) && isConnectionEstablished) {
      socket.emit(
        ClientMessages.END_GAME,
        store.getState().connection.roomName
      );
    }

    if (
      gameSlice.actions.setCurrentPiece.match(action) &&
      isConnectionEstablished
    ) {
      console.log(store.getState().game.pieceId);
      socket.emit(ClientMessages.GET_PIECE, [
        store.getState().room.roomName,
        store.getState().game.pieceId,
      ]);
    }

    next(action);
  };
};
export default socketMiddleware;
