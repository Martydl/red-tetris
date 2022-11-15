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

  getPlayerAlive(): number {
    let playerAlive: number = 0;
    for (let key in this.players) {
      if (this.players[key].opponent.status == PlayerStatus.ALIVE)
        playerAlive++;
    }
    return playerAlive;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
  }

  setNewLeader(): void {
    this.leaderID = this.players[Object.keys(this.players)[0]].id;
  }

  giveGeneratorToPlayers(): void {
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

  setget_acceleration(): boolean {
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

  setPlayersAlive(): void {
    for (let key in this.players)
      this.players[key].opponent.set_status(PlayerStatus.ALIVE);
  }
}

export default Game;
