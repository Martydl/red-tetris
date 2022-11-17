import { describe, expect, test } from "vitest";

import { Piece } from "../../../client/src/Types";

import {
  initBoard,
  initPiece,
  initQueue,
} from "../../../client/src/utils/Init";

describe("Init.ts: testing initBoard", () => {
  test("Init a new board", () => {
    const blankMatrix: number[][] = new Array(20).fill(Array(10).fill(0));
    expect(initBoard()).toEqual(blankMatrix);
  });
});

describe("Init.ts : testing initPiece", () => {
  test("Init a new piece named '0'", () => {
    const testPiece: Piece = {
      name: 0,
      rotation: 0,
      pos: { x: 3, y: 0 },
    };
    expect(initPiece(0)).toEqual(testPiece);
  });
  test("Init a new piece named '4'", () => {
    const testPiece: Piece = {
      name: 4,
      rotation: 0,
      pos: { x: 3, y: 0 },
    };
    expect(initPiece(4)).toEqual(testPiece);
  });
});

describe("Init.ts : testing initQueue", () => {
  test("Init new queue '1, 2, 3'", () => {
    const testQeue: Piece[] = [initPiece(1), initPiece(2), initPiece(3)];
    expect(initQueue([-1, 1, 2, 3])).toEqual(testQeue);
  });
  test("Init new queue '7, 4, 1'", () => {
    const testQeue: Piece[] = [initPiece(7), initPiece(4), initPiece(1)];
    expect(initQueue([-1, 7, 4, 1])).toEqual(testQeue);
  });
});
