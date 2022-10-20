import Game from "./Game";
import Player from "./Player";

class App {
  games: { [key: string]: Game };
  players: { [key: string]: Player };

  constructor() {
    this.games = {};
    this.players = {};
  }

  addGame(gameID: string, game: Game) {
    this.games[gameID] = game;
  }

  addPlayer(playerID: string, player: Player) {
    this.players[playerID] = player;
  }
}

export default App;
