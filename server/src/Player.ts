import Piece from "./Piece";
import Opponent from "./Opponent";
import seedrandom from "seedrandom";

class Player {
  id: string;
  room: string;
  opponent: Opponent;
  generator?: seedrandom.PRNG;

  constructor(id: string) {
    this.id = id;
    this.room = "waitingRoom";
    this.opponent = new Opponent(true, new Array(10).fill(0));
  }

  setRoom(room: string): void {
    this.room = room;
  }

  setGenerator(seed: string) {
    this.generator = seedrandom(seed);
  }

  genPiece(): number {
    return this.generator ? new Piece(this.generator()).name : -1;
  }

  getStarted(): number[] {
    if (this.generator)
      return [
        new Piece(this.generator()).name,
        new Piece(this.generator()).name,
        new Piece(this.generator()).name,
        new Piece(this.generator()).name,
      ];
    else return [];
  }
}

export default Player;
