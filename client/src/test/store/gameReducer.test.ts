import reducer, { gameSlice } from "../../store/GameReducer";

describe("Testing gameReducer", () => {
  test("ToggleGameOn", () => {
    expect(reducer(undefined, { type: undefined }).gameOn).toEqual(-1);
    expect(reducer(undefined, gameSlice.actions.setGameOn()).gameOn).toEqual(1);
    expect(reducer(undefined, gameSlice.actions.gameOver()).gameOn).toEqual(0);
  });

  test("setShadow", () => {
    expect(
      reducer(
        undefined,
        gameSlice.actions.setShadow([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      ).shadow
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("add and sub lines to block", () => {
    expect(
      reducer(undefined, gameSlice.actions.addLinesToBlock(5)).linesToBlock
    ).toEqual(5);
    expect(
      reducer(undefined, gameSlice.actions.subLinesToBlock(5)).linesToBlock
    ).toEqual(-5);
  });

  test("setDelay", () => {
    expect(
      reducer(undefined, gameSlice.actions.setDelay(42)).currentDelay
    ).toEqual(42);
  });

  test("setAcceleration", () => {
    expect(
      reducer(undefined, gameSlice.actions.setAcceleration(true)).acceleration
    ).toEqual(1.15);
    expect(
      reducer(undefined, gameSlice.actions.setAcceleration(false)).acceleration
    ).toEqual(0);
  });
});
