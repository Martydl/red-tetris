import { expect, it, describe } from "vitest";
import Player from "../../server/src/Player";
import Piece from "../../server/src/Piece";
import Opponent from "../../server/src/Opponent";
import { Messages } from "../../server/src/Consts";
import seedrandom from "seedrandom";

describe("Player Class", () => {
  let player = new Player("test");
  const seedTest = "seedTest";
  const generatorTest1 = seedrandom(seedTest);
  const generatorTest2 = seedrandom(seedTest);
  it("constructor", () => {
    expect(player.id).toEqual("test");
    expect(player.room).toEqual(Messages.WAITING_ROOM);
    expect(player.opponent).toBeInstanceOf(Opponent);
    expect(player.generator).toBe(undefined);
  });

  it("setRoom", () => {
    player.setRoom("roomTest");
    expect(player.room).toEqual("roomTest");
  });

  it("setGenerator", () => {
    player.setGenerator(seedTest);
    expect(player.generator).not.toEqual(undefined);
  });

  it("genPiece", () => {
    let pieceName = new Piece(generatorTest1()).name;
    expect(player.genPiece()).toEqual(pieceName);
    player.generator = undefined;
    expect(player.genPiece()).toEqual(-1);
  });

  it("getStarted", () => {
    let pieceArray = [
      new Piece(generatorTest2()).name,
      new Piece(generatorTest2()).name,
      new Piece(generatorTest2()).name,
      new Piece(generatorTest2()).name,
    ];
    expect(player.getStarted()).toEqual([]);
    player.setGenerator(seedTest);
    expect(player.getStarted()).toEqual(pieceArray);
  });
});
