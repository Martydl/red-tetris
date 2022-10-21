class Piece {
  name: number;

  constructor() {
    this.name = Math.round(Math.random() * 100) % 7;
  }
}

export default Piece;
