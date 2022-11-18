import { describe, expect, test } from "vitest";

import {
  moveSecond,
  moveLeft,
  moveRight,
  moveUp,
  moveBottom,
} from "../../../client/src/utils/PieceMoves";

import { initBoard, initPiece } from "../../../client/src/utils/Init";

describe("PieceMoves.ts: testing moveSecond", () => {
  test("Can move down", () => {
    expect(moveSecond(initBoard(), initPiece(0))).toEqual({ x: 3, y: 1 });
  });
  test("Cannot move down", () => {
    let testBoard = initBoard();
    testBoard[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    expect(moveSecond(testBoard, initPiece(0))).toEqual(undefined);
  });
});

describe("PieceMoves.ts: testing moveLeft", () => {
  test("Can move left", () => {
    expect(moveLeft(initBoard(), initPiece(0))).toEqual({ x: 2, y: 0 });
  });
  test("Cannot move left", () => {
    const piece = { ...initPiece(0), pos: { x: -1, y: 0 } };
    expect(moveLeft(initBoard(), piece)).toEqual(undefined);
  });
});

describe("PieceMoves.ts: testing moveRight", () => {
  test("Can move right", () => {
    expect(moveRight(initBoard(), initPiece(0))).toEqual({ x: 4, y: 0 });
  });
  test("Cannot move Right", () => {
    const piece = { ...initPiece(0), pos: { x: 6, y: 0 } };
    expect(moveRight(initBoard(), piece)).toEqual(undefined);
  });
});

describe("PieceMoves.ts: testing moveUp", () => {
  test("Can rotate", () => {
    expect(moveUp(initBoard(), initPiece(0))).toEqual(1);
  });
  test("Cannot rotate", () => {
    const piece = { ...initPiece(0), pos: { x: 7, y: 0 }, rotation: 1 };
    expect(moveUp(initBoard(), piece)).toEqual(undefined);
  });
});

describe("PieceMoves.ts: testing moveBotton", () => {
  test("Move square to bottom", () => {
    expect(moveBottom(initBoard(), initPiece(3))).toEqual({ x: 3, y: 18 });
  });
});
