import Player from "./Player";

class Game {
  name: string;
  players: Player[];
  seed: any;
  leader: string;

  constructor(room: string, creator: Player) {
    this.name = room;
    this.players = [creator];
    this.seed = Math.random();
    this.leader = creator.id;
  }

  setNewLeader() {
    this.leader = this.players[0].id;
  }

  sendMalus(playerID: string, nbMalus: number) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === playerID) continue;
      console.log("send ", nbMalus, "to ", this.players[i].id);
    }
  }

  sendShadow(player: Player) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === player.id) continue;
      console.log("send ", player.shadow, "to ", this.players[i].id);
    }
  }
}

export default Game;
