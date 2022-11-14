import Player from "./Player";
import Piece from "./Piece";

class Game {
  gameID: string;
  players: { [key: string]: Player };
  leaderID: string;
  gameOn: boolean;
  seed?: string;

  constructor(gameId: string, creator: Player) {
    this.gameID = gameId;
    this.players = { [creator.id]: creator };
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
    this.leaderID = this.players[Object.keys(this.players)[0]].id;
  }

  giveGeneratorToPlayers() {
    this.seed = Math.random().toString();
    for (let playerID in this.players) {
      this.players[playerID].setGenerator(this.seed);
    }
  }

  getStartPieceList() {
    return [
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
    ];
  }

  getOpponents(playerID: string): { [id: string]: Object } {
    let opponents: { [id: string]: Object } = {};
    for (let id in this.players) {
      if (id != playerID)
        opponents[id] = JSON.parse(JSON.stringify(this.players[id].opponent));
    }
    return opponents;
  }
}

export default Game;
