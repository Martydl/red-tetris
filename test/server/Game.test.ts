import { expect, it, describe } from "vitest";
import Game from "../../server/src/Game";
import Player from "../../server/src/Player";
import PlayerStatus from "../../server/src/Consts";

describe("Game Class", () => {
  let player1 = new Player("tester1");
  let player2 = new Player("tester2");
  let game = new Game("test", player1);

  it("constructor", () => {
    expect(game.gameID).toEqual("test");
    expect(Object.keys(game.players).length).toEqual(1);
    expect(Object.keys(game.players)).toEqual(["tester1"]);
    expect(game.players["tester1"]).toEqual(player1);
    expect(game.leaderID).toEqual("tester1");
    expect(game.gameOn).toEqual(false);
    expect(game.acceleration).toEqual(true);
  });

  it("setGameOn", () => {
    game.setGameOn(true);
    expect(game.gameOn).toEqual(true);
  });

  it("isEndGame", () => {
    expect(game.isEndGame()).toEqual(false);
    game.acceleration = false;
    expect(game.isEndGame()).toEqual(true);
    game.acceleration = true;
  });

  it("addPlayer", () => {
    game.addPlayer(player2);
    expect(Object.keys(game.players).length).toEqual(2);
    expect(Object.keys(game.players)).toEqual(["tester1", "tester2"]);
    expect(game.players["tester2"]).toEqual(player2);
  });

  it("setLastWinner", () => {
    expect(game.lastWinner).toEqual(undefined);
    game.setLastWinner("tester2");
    expect(game.lastWinner).toEqual("tester2");
    game.acceleration = false;
    game.setLastWinner("tester2");
    expect(game.lastWinner).toEqual("tester1");
    game.acceleration = true;
  });

  it("setNewLeader", () => {
    game.setNewLeader();
    expect(game.leaderID).toEqual("tester1");
  });

  it("setgiveGeneratorToPlayers", () => {
    const old_seed = game.seed;
    const old_gen1 = game.players["tester1"].generator;
    const old_gen2 = game.players["tester2"].generator;
    game.setgiveGeneratorToPlayers();
    expect(game.seed).not.toEqual(old_seed);
    expect(game.players["tester1"].generator).not.toEqual(old_gen1);
    expect(game.players["tester2"].generator).not.toEqual(old_gen2);
  });

  it("getStartPieceList", () => {
    const return_test = game.getStartPieceList();
    const isNumberArray =
      return_test.length > 0 &&
      return_test.every((value) => {
        return typeof value === "number";
      });
    expect(return_test.length).toEqual(4);
    expect(Array.isArray(return_test)).toEqual(true);
    expect(isNumberArray).toEqual(true);
  });

  it("setgetAcceleration", () => {
    const old_acceleration = game.acceleration;
    const return_test = game.setgetAcceleration();
    expect(game.acceleration).not.toEqual(old_acceleration);
    expect(return_test).toEqual(game.acceleration);
  });

  it("getOpponents", () => {
    const test = { [player2.id]: JSON.parse(JSON.stringify(player2.opponent)) };
    expect(game.getOpponents(player1.id)).toEqual(test);
  });

  it("setPlayersAlive", () => {
    const emptyShadow = new Array(10).fill(0);
    player1.opponent.setStatus(PlayerStatus.DEAD);
    player2.opponent.setStatus(PlayerStatus.DEAD);
    game.resetOpponents();
    expect(player1.opponent.status).toEqual(PlayerStatus.ALIVE);
    expect(player2.opponent.status).toEqual(PlayerStatus.ALIVE);
    expect(player1.opponent.shadow).toEqual(emptyShadow);
    expect(player2.opponent.shadow).toEqual(emptyShadow);
  });
});
