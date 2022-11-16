import PlayerStatus from "./Consts";

class Opponent {
  playerName: string;
  status: PlayerStatus;
  shadow: number[];

  constructor(status: PlayerStatus, shadow: number[]) {
    this.playerName = "guest";
    this.status = status;
    this.shadow = shadow;
  }

  setName(name: string): void {
    this.playerName = name;
  }

  newShadow(shadow: number[]) {
    this.shadow = shadow;
  }

  setStatus(status: PlayerStatus) {
    this.status = status;
  }
}

export default Opponent;
