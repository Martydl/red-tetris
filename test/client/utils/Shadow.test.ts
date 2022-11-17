import { describe, expect, test } from "vitest";

import { genShadow, genFullShadow } from "../../../client/src/utils/Shadow";

describe("Shadow.ts: testing genShadow and genFullShadow", () => {
  const shadow: number[] = [7, 1, 5, 10, 12, 13, 10, 6, 20, 0];
  const fullShadow: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 15, 0, 0, 15, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 15, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 15, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 15, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 15, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 15, 0],
    [15, 0, 0, 15, 15, 15, 15, 0, 15, 0],
    [15, 0, 0, 15, 15, 15, 15, 15, 15, 0],
    [15, 0, 15, 15, 15, 15, 15, 15, 15, 0],
    [15, 0, 15, 15, 15, 15, 15, 15, 15, 0],
    [15, 0, 15, 15, 15, 15, 15, 15, 15, 0],
    [15, 0, 15, 15, 15, 15, 15, 15, 15, 0],
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 0],
  ];
  test("Create shadow from matrix", () => {
    expect(genShadow(fullShadow)).toEqual(shadow);
  });
  test("Create full shadow from shadow", () => {
    expect(genFullShadow(shadow)).toEqual(fullShadow);
  });
});
