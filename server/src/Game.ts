import Player from "./Player";
import Piece from "./Piece";

class Game {
  gameID: string;
  players: { [key: string]: Player };
  pieces: Piece[];
  leaderID: string;
  gameOn: boolean;

  constructor(gameId: string, creator: Player) {
    this.gameID = gameId;
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
    this.leaderID = this.players[Object.keys(this.players)[0]].id;
  }

  getPiece(nbPiece: number): number {
    if (nbPiece >= this.pieces.length) {
      let newPiece: Piece = new Piece();
      this.pieces.push(newPiece);
      return newPiece.name;
    } else return this.pieces[nbPiece].name;
  }

  getStartPieceList(): number[] {
    let startPieceList: number[] = [];
    for (let elem in this.pieces) {
      startPieceList.push(this.pieces[elem].name);
    }
    return startPieceList;
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
