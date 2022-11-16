import { expect, it, describe } from "vitest";
import Opponent from "../../server/src/Opponent";
import PlayerStatus from "../../server/src/Consts";

describe("Opponent Class", () => {
  let opponent = new Opponent(PlayerStatus.ALIVE, new Array(10).fill(0));

  it("constructor", () => {
    expect(opponent.playerName).toEqual("guest");
    expect(opponent.status).toEqual(PlayerStatus.ALIVE);
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

  it("setStatus", () => {
    opponent.setStatus(PlayerStatus.DEAD);
    expect(opponent.status).toEqual(PlayerStatus.DEAD);
  });
});
