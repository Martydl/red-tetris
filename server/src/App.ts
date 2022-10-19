import Game from "./Game";
import Piece from "./Piece";
import Player from "./Player";

class App {
  games: Game[];
  pieces: Piece[];
  players: Player[];
  socketList: any[];

  constructor() {
    this.games = [];
    this.pieces = [];
    this.players = [];
    this.socketList = [];
  }

  addSocket(socket: any) {
    this.socketList.push(socket);
  }

  addPlayer(uuid: string) {
    this.players.push(new Player(uuid));
  }
}

export default App;
