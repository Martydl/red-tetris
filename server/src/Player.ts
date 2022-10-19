class Player {
  id: string;
  name: string;
  room: string;
  alive: boolean;
  shadow: number[];

  constructor(id: string) {
    this.id = id;
    this.name = id;
    this.room = "";
    this.alive = true;
    this.shadow = new Array(10).fill(0);
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
