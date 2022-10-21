import { expect, it, describe } from "vitest";
import Game from "../../server/src/Game";
import Player from "../../server/src/Player";
import Piece from "../../server/src/Piece";

describe("Game Class", () => {
  let player1 = new Player("tester1");
  let player2 = new Player("tester2");
  let gameTest = new Game("TEST", player1);

  it("constructor", () => {
    expect(gameTest.gameID).toEqual("TEST");
    expect(gameTest.players).toEqual({ [player1.id]: player1 });
    expect(gameTest.pieces.length).toEqual(4);
    for (let elem in gameTest.pieces) {
      expect(gameTest.pieces[elem]).toBeInstanceOf(Piece);
    }
    expect(gameTest.leaderID).toEqual(player1.id);
    expect(gameTest.gameOn).toEqual(false);
  });

  it("gameStart", () => {
    gameTest.gameStart();
    expect(gameTest.gameOn).toEqual(true);
  });

  it("gameEnd", () => {
    gameTest.gameEnd();
    expect(gameTest.gameOn).toEqual(false);
  });

  it("addPlayer", () => {
    let playerLen = Object.keys(gameTest.players).length;
    gameTest.addPlayer(player2);
    expect(Object.keys(gameTest.players).length).toEqual(playerLen + 1);
    expect(gameTest.players[player2.id]).toEqual(player2);
    // toMatchObject
  });

  it("setNewLeader", () => {
    delete gameTest.players[player1.id];
    gameTest.setNewLeader();
    expect(gameTest.leaderID).toEqual(player2.id);
  });

  it("getPiece", () => {
    let piece1 = gameTest.getPiece(2);
    let piecesLen1 = gameTest.pieces.length;
    let piece2 = gameTest.getPiece(4);
    let piecesLen2 = gameTest.pieces.length;
    expect(piece1).toEqual(gameTest.pieces[2].name);
    expect(piecesLen1).toEqual(4);
    expect(piece2).toEqual(gameTest.pieces[4].name);
    expect(piecesLen2).toEqual(5);
  });

  it("getStartPieceList", () => {
    gameTest.pieces[0].name;
    expect(gameTest.getStartPieceList()).toEqual([
      gameTest.pieces[0].name,
      gameTest.pieces[1].name,
      gameTest.pieces[2].name,
      gameTest.pieces[3].name,
      gameTest.pieces[4].name,
    ]);
  });

  it("getOpponents", () => {
    expect(gameTest.getOpponents(player1.id)).toEqual({
      [player2.id]: JSON.parse(JSON.stringify(player2.opponent)),
    });
  });
});
