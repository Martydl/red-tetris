import App from "../App";
import Game from "../Game";
import Player from "../Player";

describe("App Class", () => {
  let app = new App();
  let player = new Player("test");
  let game = new Game("RoomTest", player);

  it("constructor", () => {
    expect(app.games).toEqual({});
    expect(app.players).toEqual({});
  });

  it("addGame", () => {
    app.addGame("RoomTest", game);
    expect(Object.keys(app.games).length).toEqual(1);
    expect(Object.keys(app.games)).toEqual(["RoomTest"]);
    expect(app.games["RoomTest"]).toEqual(game);
  });

  it("addPlayer", () => {
    app.addPlayer("test", player);
    expect(Object.keys(app.players).length).toEqual(1);
    expect(Object.keys(app.players)).toEqual(["test"]);
    expect(app.players["test"]).toEqual(player);
  });

  it("getRoomsInfos", () => {
    let returnTest = app.getRoomsInfos();
    expect(Object.keys(returnTest).length).toEqual(1);
    expect(returnTest["RoomTest"]).toEqual({ playerNb: 1, gameOn: false });
  });
});
