import Game from "./Game";
import Player from "./Player";
import { Server, Socket } from "socket.io";
import { Messages } from "./Consts";

class App {
  games: { [id: string]: Game };
  players: { [id: string]: Player };

  constructor() {
    this.games = {};
    this.players = {};
  }

  addGame(gameID: string, game: Game): void {
    this.games[gameID] = game;
  }

  addPlayer(playerID: string, player: Player): void {
    this.players[playerID] = player;
  }

  getRoomsInfos(): { [key: string]: Object } {
    let roomsInfos: { [key: string]: Object } = {};
    for (let elem in this.games) {
      roomsInfos[elem] = {
        playerNb: Object.keys(this.games[elem].players).length,
        gameOn: this.games[elem].gameOn,
      };
    }
    return roomsInfos;
  }

  sendAllRoomsInfos(io: Server) {
    io.to(Messages.WAITING_ROOM).emit(Messages.ROOM_LIST, this.getRoomsInfos());
  }

  sendAllStartGame(io: Server, gameID: string) {
    io.to(gameID).emit(
      Messages.START_GAME,
      this.games[gameID].getStartPieceList()
    );
  }

  sendAllEndGame(io: Server, gameID: string, lastWinner: string) {
    io.to(gameID).emit(Messages.END_GAME, lastWinner);
  }

  sendBroadcastOpponent(socket: Socket, gameID: string) {
    socket.broadcast
      .to(gameID)
      .emit(Messages.SEND_OPPONENT, [
        socket.id,
        this.players[socket.id].opponent,
      ]);
  }

  sendBroadcastDelOpponent(socket: Socket, gameID: string) {
    socket.broadcast
      .to(gameID)
      .emit(Messages.DELETE_OPPONENT, [socket.id, this.games[gameID].leaderID]);
  }

  sendBroadcastNewPlayerName(socket: Socket, gameID: string, newName: string) {
    socket.broadcast
      .to(gameID)
      .emit(Messages.NEW_PLAYER_NAME, [socket.id, newName]);
  }

  sendGenPiece(socket: Socket) {
    socket.emit(Messages.GET_PIECE, this.players[socket.id].genPiece());
  }

  sendBroadcastPlayerGameOver(socket: Socket, gameID: string) {
    socket.broadcast.to(gameID).emit(Messages.PLAYER_GAME_OVER, socket.id);
  }

  sendBroadcastNewShadow(socket: Socket, gameID: string, shadow: number[]) {
    socket.broadcast.to(gameID).emit(Messages.NEW_SHADOW, [socket.id, shadow]);
  }

  sendBroadcastToggleAcceleration(socket: Socket, gameID: string) {
    socket.broadcast
      .to(gameID)
      .emit(
        Messages.TOGGLE_ACCELERATION,
        this.games[gameID].setgetAcceleration()
      );
  }

  sendBroadcastLinesDestroyed(socket: Socket, lineNB: number) {
    socket.broadcast
      .to(this.players[socket.id].room)
      .emit(Messages.LINES_DESTROYED, lineNB);
  }

  sendRoomInfo(socket: Socket, gameID: string) {
    socket.emit(Messages.ROOM_INFO, [
      gameID,
      this.games[gameID].leaderID,
      this.games[gameID].getOpponents(socket.id),
      this.games[gameID].gameOn,
    ]);
  }

  RoomDisconnect(io: Server, socket: Socket, gameID: string) {
    if (
      gameID != "undef" &&
      gameID != Messages.WAITING_ROOM &&
      this.games[gameID] &&
      Object.keys(this.games[gameID].players).length > 1
    ) {
      delete this.games[gameID].players[socket.id];
      this.games[gameID].setNewLeader();
      this.sendBroadcastDelOpponent(socket, gameID);
    } else if (gameID != Messages.WAITING_ROOM) delete this.games[gameID];
    this.sendAllRoomsInfos(io);
  }
}

export default App;
