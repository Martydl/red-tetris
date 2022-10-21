import Player from "./Player";
import Piece from "./Piece";
import seedrandom from "seedrandom";

class Game {
  gameID: string;
  players: { [key: string]: Player };
  leaderID: string;
  gameOn: boolean;
  seed: string;

  constructor(gameId: string, creator: Player) {
    this.gameID = gameId;
    this.players = { [creator.id]: creator };
    this.leaderID = creator.id;
    this.gameOn = false;
    this.seed = Math.random().toString();
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
    for (let playerID in this.players) {
      console.log("playerID:", playerID);
      this.players[playerID].setGenerator(this.seed);
    }
  }

  getStartPieceList() {
    for (let i = 0; i < Object.keys(this.players).length - 1; ++i) {
      this.players[Object.keys(this.players)[i]].getStarted();
    }
    return this.players[
      Object.keys(this.players)[Object.keys(this.players).length - 1]
    ].getStarted();
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
