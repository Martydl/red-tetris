import Player from "./Player";
import Piece from "./Piece";
import PlayerStatus from "./Consts";

class Game {
  seed?: string;
  gameID: string;
  leaderID: string;
  gameOn: boolean;
  acceleration: boolean;
  players: { [key: string]: Player };

  constructor(gameId: string, creator: Player) {
    this.gameID = gameId;
    this.players = { [creator.id]: creator };
    this.leaderID = creator.id;
    this.gameOn = false;
    this.acceleration = true;
  }

  setGameStart(): void {
    this.gameOn = true;
  }

  setGameOver(): void {
    this.gameOn = false;
  }

  isEndGame(): boolean {
    let playerAlive: number = 0;
    for (let key in this.players) {
      if (this.players[key].opponent.status == PlayerStatus.ALIVE)
        playerAlive++;
    }
    return (
      (this.acceleration && playerAlive < 1) ||
      (!this.acceleration && playerAlive < 2)
    );
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  setNewLeader(): void {
    this.leaderID = this.players[Object.keys(this.players)[0]].id;
  }

  setgiveGeneratorToPlayers(): void {
    this.seed = Math.random().toString();
    for (let playerID in this.players)
      this.players[playerID].setGenerator(this.seed);
  }

  getStartPieceList(): number[] {
    return [
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
      new Piece(Math.random()).name,
    ];
  }

  setgetAcceleration(): boolean {
    this.acceleration = !this.acceleration;
    return this.acceleration;
  }

  getOpponents(playerID: string): { [id: string]: Object } {
    let opponents: { [id: string]: Object } = {};
    for (let key in this.players)
      if (key != playerID)
        opponents[key] = JSON.parse(JSON.stringify(this.players[key].opponent));
    return opponents;
  }

  resetOpponents(): void {
    for (let key in this.players) {
      this.players[key].opponent.setStatus(PlayerStatus.ALIVE);
      this.players[key].opponent.newShadow(new Array(10).fill(0));
    }
  }
}

export default Game;
