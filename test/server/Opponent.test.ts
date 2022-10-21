import { expect, it, describe } from "vitest";
import Opponent from "../../server/src/Opponent";

describe("Opponent Class", () => {
  let opponent = new Opponent(true, new Array(10).fill(0));

  it("constructor", () => {
    expect(opponent.playerName).toEqual("guest");
    expect(opponent.gameOver).toEqual(false);
    expect(opponent.shadow).toEqual(new Array(10).fill(0));
  });

  it("setName", () => {
    opponent.setName("tester1");
    expect(opponent.playerName).toEqual("tester1");
  });

  it("newShadow", () => {
    let shadowTest = new Array(10).fill(15);
    opponent.newShadow(shadowTest);
    expect(opponent.shadow).toEqual(shadowTest);
  });

  it("dead", () => {
    opponent.dead();
    expect(opponent.gameOver).toEqual(true);
  });
});
