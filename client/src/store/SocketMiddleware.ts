import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { Messages } from "../Consts";
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
        Messages.ROOM_LIST,
        (arg: { [key: string]: { playerNb: number; gameOn: boolean } }) => {
          store.dispatch(connectionSlice.actions.setRoomList(arg));
        }
      );

      socket.on("connect", () => {
        const buffer: string | undefined =
          store.getState().connection.routingBuffer;
        store.dispatch(
          connectionSlice.actions.socketConnectionEstablished(socket.id)
        );
        if (buffer)
          store.dispatch(connectionSlice.actions.startConnectingToRoom(buffer));
      });

      // Events received from the server
      socket.on(
        Messages.ROOM_INFO,
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

      socket.on(Messages.LEADER_ID, (id: string) => {
        store.dispatch(roomSlice.actions.setLeaderId(id));
      });

      socket.on(Messages.SEND_OPPONENT, (msg: [string, Opponent]) => {
        const [id, opponent] = msg;
        store.dispatch(roomSlice.actions.addOpponent([id, opponent]));
      });

      socket.on(Messages.DELETE_OPPONENT, (msg: [string, string]) => {
        const [id, leaderId] = msg;
        store.dispatch(roomSlice.actions.delOpponent(id));
        store.dispatch(roomSlice.actions.setLeaderId(leaderId));
      });

      socket.on(Messages.START_GAME, (piecesNames: number[]) => {
        store.dispatch(roomSlice.actions.startGame());
        store.dispatch(gameSlice.actions.setGameOn());
        store.dispatch(gameSlice.actions.initPieces(piecesNames));
        store.dispatch(
          gameSlice.actions.setAcceleration(store.getState().room.acceleration)
        );
      });

      socket.on(Messages.END_GAME, () => {
        store.dispatch(gameSlice.actions.resetGameState());
        store.dispatch(roomSlice.actions.endGame());
        store.dispatch(roomSlice.actions.resetOpponents());
      });

      socket.on(Messages.GET_PIECE, (pieceName: number) => {
        store.dispatch(gameSlice.actions.updateQueue(initPiece(pieceName)));
      });

      socket.on(Messages.NEW_SHADOW, (arg: [string, number[]]) => {
        const [id, shadow] = arg;
        store.dispatch(roomSlice.actions.editOpponentShadow([id, shadow]));
      });

      socket.on(Messages.TOGGLE_ACCELERATION, (acceleration: boolean) => {
        store.dispatch(roomSlice.actions.setAcceleration(acceleration));
      });

      socket.on(Messages.PLAYER_GAME_OVER, (id: string) => {
        store.dispatch(
          roomSlice.actions.editOpponentGameStatus([id, PlayerStatus.DEAD])
        );
      });

      socket.on(Messages.LINES_DESTROYED, (nb: number) => {
        store.dispatch(gameSlice.actions.addLinesToBlock(nb));
      });
    }

    // Events sent to the server
    if (
      connectionSlice.actions.startConnectingToRoom.match(action) &&
      isConnectionEstablished
    ) {
      const roomName = action.payload;
      const playerName = store.getState().connection.playerName;
      socket.emit(Messages.JOIN_ROOM, [roomName, playerName]);
      window.history.replaceState(
        {},
        "",
        "/#" + roomName + "[" + playerName + "]"
      );
    } else if (
      connectionSlice.actions.startConnectingToRoom.match(action) &&
      !isConnectionEstablished
    ) {
      store.dispatch(connectionSlice.actions.setRoutingBuffer(action.payload));
    }

    if (gameSlice.actions.setShadow.match(action) && isConnectionEstablished) {
      socket.emit(Messages.NEW_SHADOW, [
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
        socket.emit(Messages.LINES_DESTROYED, lines - 1);
      }
    }

    if (gameSlice.actions.gameOver.match(action) && isConnectionEstablished) {
      socket.emit(
        Messages.PLAYER_GAME_OVER,
        store.getState().connection.roomName
      );
    }

    if (
      roomSlice.actions.toggleAcceleration.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(
        Messages.TOGGLE_ACCELERATION,
        store.getState().connection.roomName
      );
    }

    if (roomSlice.actions.lauchGame.match(action) && isConnectionEstablished) {
      socket.emit(Messages.START_GAME, store.getState().connection.roomName);
    }

    if (
      gameSlice.actions.setCurrentPiece.match(action) &&
      isConnectionEstablished
    ) {
      socket.emit(Messages.GET_PIECE, [store.getState().room.roomName]);
    }

    if (
      connectionSlice.actions.roomDisconnect.match(action) &&
      isConnectionEstablished
    ) {
      window.history.replaceState({}, "", "/");
      socket.emit(Messages.ROOM_DISCONNECT, store.getState().room.roomName);
      store.dispatch(roomSlice.actions.resetRoomState());
      store.dispatch(gameSlice.actions.resetGameState());
    }

    next(action);
  };
};
export default socketMiddleware;
