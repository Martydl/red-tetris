import { describe, expect, test } from "vitest";

import { getPoints } from "../../../client/src/utils/Score";

describe("Score.ts: testing GetPoints", () => {
  test("getPoints", () => {
    expect(getPoints(3, 1)).toEqual(160);
    expect(getPoints(5, 2)).toEqual(600);
    expect(getPoints(7, 3)).toEqual(2400);
    expect(getPoints(9, 4)).toEqual(12000);
    expect(getPoints(7, 0)).toEqual(0);
  });
});
