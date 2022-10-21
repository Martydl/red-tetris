class Opponent {
  playerName: string;
  gameOver: boolean;
  shadow: number[];
  // gameBoard: number[][];

  constructor(alive: boolean, shadow: number[]) {
    this.playerName = "guest";
    this.gameOver = !alive;
    this.shadow = shadow;
    // this.gameBoard = gameBoard;
  }

  setName(name: string): void {
    this.playerName = name;
  }

  newShadow(shadow: number[]) {
    this.shadow = shadow;
  }

  dead() {
    this.gameOver = false;
  }
}

export default Opponent;
