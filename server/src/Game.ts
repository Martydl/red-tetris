import Player from "./Player";
import Piece from "./Piece";
// import Opponent from "./Opponent"; NEEDED FOR OPPONENT INTEGRATION

class Game {
  name: string;
  players: { [key: string]: Player };
  // opponents: Opponent[]; NEEDED FOR OPPONENT INTEGRATION
  pieces: Piece[];
  seed: any;
  leader: string;
  gameOn: boolean;

  constructor(room: string, creator: Player) {
    this.name = room;
    this.players = { [creator.id]: creator };
    // this.opponents = [ NEEDED FOR OPPONENT INTEGRATION
    //   new Opponent(
    //     creator.name,
    //     creator.alive,
    //     creator.shadow,
    //     creator.gameBoard
    //   ),
    // ];
    this.pieces = [new Piece(), new Piece(), new Piece(), new Piece()];
    this.seed = Math.random();
    this.leader = creator.id;
    this.gameOn = false;
  }

  addPlayer(player: Player): void {
    this.players[player.id] = player;
    // this.opponents.push( NEEDED FOR OPPONENT INTEGRATION
    //   new Opponent(player.name, player.alive, player.shadow, player.gameBoard)
    // );
  }

  setNewLeader(): void {
    this.leader = this.players[0].id;
  }

  getNextPiece(): Piece {
    let newPiece: Piece = new Piece();
    this.pieces.push(newPiece);
    return newPiece;
  }
}

export default Game;
