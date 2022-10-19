import seedrandom from "seedrandom";

class Piece {
  seed: number;

  constructor() {
    this.seed = Math.random();
  }
}

export default Piece;
