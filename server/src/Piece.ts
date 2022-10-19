import seedrandom from "seedrandom";

class Piece {
  tmp: string;
  randomGen: seedrandom.PRNG;

  constructor(tmp: string) {
    this.tmp = tmp;
    this.randomGen = seedrandom();
  }
}

export default Piece;
