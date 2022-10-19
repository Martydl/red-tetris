import Player from "./Player";
import Piece from "./Piece";

class Game {
  name: string;
  players: Player[];
  seed: any;

  constructor(room: string) {
    this.name = room;
    this.players = [];
    this.seed = Piece;
    this.difficulty = Number;
  }

  setLeader() {
    this.players[0].leader = true;
  }

  sendMalus(name, nb) {}
}

export default Game;
