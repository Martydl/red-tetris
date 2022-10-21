import Piece from "./Piece";
import Opponent from "./Opponent";
import seedrandom from "seedrandom";

class Player {
  id: string;
  room: string;
  opponent: Opponent;
  seed?: seedrandom.PRNG;

  constructor(id: string) {
    this.id = id;
    this.room = "waitingRoom";
    this.opponent = new Opponent(true, new Array(10).fill(0));
  }

  setRoom(room: string): void {
    this.room = room;
  }

  genPiece(): number {
    return this.seed ? new Piece(this.seed()).name : -1;
  }
}

export default Player;
