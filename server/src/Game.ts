import Player from "./Player";
import Piece from "./Piece";
import Opponent from "./Opponent";

class Game {
  name: string;
  players: { [key: string]: Player };
  pieces: Piece[];
  leaderID: string;
  gameOn: boolean;

  constructor(gameId: string, creator: Player) {
    this.name = gameId;
    this.players = { [creator.id]: creator };
    this.pieces = [new Piece(), new Piece(), new Piece(), new Piece()];
    this.leaderID = creator.id;
    this.gameOn = false;
  }

  gameStart(): void {
    this.gameOn = true;
  }

  gameEnd(): void {
    this.gameOn = false;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  setNewLeader(): void {
    this.leaderID = this.players[0].id;
  }

  getNextPiece(): Piece {
    let newPiece: Piece = new Piece();
    this.pieces.push(newPiece);
    return newPiece;
  }

  getOpponents(playerID: string): { [id: string]: {} } {
    let opponents: { [id: string]: {} } = {};
    for (let id in this.players) {
      if (id != playerID)
        opponents[id] = JSON.parse(JSON.stringify(this.players[id].opponent));
    }
    return opponents;
  }
}

export default Game;
