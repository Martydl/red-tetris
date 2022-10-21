import { expect, it, describe } from "vitest";
import Player from "../../server/src/Player";
import Opponent from "../../server/src/Opponent";

describe("Opponent Class", () => {
  let player = new Player("test");

  it("constructor", () => {
    expect(player.id).toEqual("test");
    expect(player.room).toEqual("waitingRoom");
    expect(player.opponent).toBeInstanceOf(Opponent);
  });

  it("setRoom", () => {
    player.setRoom("roomTest");
    expect(player.room).toEqual("roomTest");
  });
});
