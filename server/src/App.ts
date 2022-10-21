import Game from "./Game";
import Player from "./Player";

class App {
  games: { [id: string]: Game };
  players: { [id: string]: Player };

  constructor() {
    this.games = {};
    this.players = {};
  }

  addGame(gameID: string, game: Game): void {
    this.games[gameID] = game;
  }

  addPlayer(playerID: string, player: Player): void {
    this.players[playerID] = player;
  }

  getRoomsInfos(): { [key: string]: Object } {
    let roomsInfos: { [key: string]: Object } = {};
    for (let elem in this.games) {
      roomsInfos[elem] = {
        playerNB: Object.keys(this.games[elem].players).length,
        gameOn: this.games[elem].gameOn,
      };
    }
    return roomsInfos;
  }
}

export default App;
