class Player {
  id: string;
  name: string;
  room: string;
  alive: boolean;
  shadow: number[];
  // gameBoard: number[][]; NEEDED FOR OPPONENT INTEGRATION

  constructor(id: string) {
    this.id = id;
    this.name = "guest";
    this.room = "waiting";
    this.alive = true;
    this.shadow = new Array(10).fill(0);
    // this.gameBoard = new Array(20); NEEDED FOR OPPONENT INTEGRATION
    // for (let i = 0; i < 20; i++) {
    //   this.gameBoard[i] = new Array(10);
    // }
  }

  setName(name: string) {
    this.name = name;
  }

  setRoom(room: string) {
    this.room = room;
  }

  newShadow(shadow: number[]) {
    this.shadow = shadow;
  }

  dead() {
    this.alive = false;
  }
}

export default Player;
