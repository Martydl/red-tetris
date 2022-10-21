import Opponent from "./Opponent";

class Player {
  id: string;
  room: string;
  opponent: Opponent;

  constructor(id: string) {
    this.id = id;
    this.room = "waitingRoom";
    this.opponent = new Opponent(true, new Array(10).fill(0));
  }

  setRoom(room: string): void {
    this.room = room;
  }
}

export default Player;
