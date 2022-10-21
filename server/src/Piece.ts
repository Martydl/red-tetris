class Piece {
  name: number;

  constructor(number: number) {
    this.name = Math.round(number * 100) % 7;
  }
}

export default Piece;
