class Player {
  name: string;
  room: string;
  leader: boolean;
  alive: boolean;
  shadow: number[];

  constructor(name: string, room: string) {
    this.name = name;
    this.room = room;
    this.leader = false;
    this.alive = true;
    this.shadow = new Array(10).fill(0);
  }

  newShadow(shadow: number[]) {
    this.shadow = shadow;
  }

  dead() {
    this.alive = false;
  }
}

export default Player;
