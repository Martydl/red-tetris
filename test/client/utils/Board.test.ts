import { describe, expect, test } from "vitest";

import { piecesList } from "../../../client/src/Consts";

import {
  addPieceToBoard,
  updatePrintBoard,
  checkGameBoard,
  checkCollisions,
} from "../../../client/src/utils/Board";

import { initBoard, initPiece } from "../../../client/src/utils/Init";

describe("Board.ts: testing addPieceToBoard", () => {
  test("Add square in initial position to empty matrix", () => {
    let refBoard = initBoard();
    refBoard[0][4] = 4;
    refBoard[0][5] = 4;
    refBoard[1][4] = 4;
    refBoard[1][5] = 4;
    expect(addPieceToBoard(initBoard(), initPiece(3))).toEqual(refBoard);
  });
  test("Add T alongside left border", () => {
    let refBoard = initBoard();
    refBoard[15][1] = 6;
    refBoard[16][0] = 6;
    refBoard[16][1] = 6;
    refBoard[17][1] = 6;
    let piece = initPiece(5);
    piece.pos = { x: -1, y: 15 };
    piece.rotation = 3;
    expect(addPieceToBoard(initBoard(), piece)).toEqual(refBoard);
  });
});

describe("Board.ts: testing updatePrintBoard", () => {
  test("Basic piece on top with shadow", () => {
    let refBoard = initBoard();
    refBoard[0][4] = 4;
    refBoard[0][5] = 4;
    refBoard[1][4] = 4;
    refBoard[1][5] = 4;
    refBoard[18][4] = 11;
    refBoard[18][5] = 11;
    refBoard[19][4] = 11;
    refBoard[19][5] = 11;
    const piece = initPiece(3);
    expect(updatePrintBoard(initBoard(), piece)).toEqual(refBoard);
  });
  test("T alongside left border with overlapped shadow", () => {
    let refBoard = initBoard();
    refBoard[15][1] = 6;
    refBoard[16][0] = 6;
    refBoard[16][1] = 6;
    refBoard[17][1] = 6;
    refBoard[18][0] = 13;
    refBoard[18][1] = 13;
    refBoard[19][1] = 13;
    let piece = initPiece(5);
    piece.pos = { x: -1, y: 15 };
    piece.rotation = 3;
    expect(updatePrintBoard(initBoard(), piece)).toEqual(refBoard);
  });
});

describe("Board.ts: testing checkGameBoard", () => {
  test("Empty board with one completed line", () => {
    let testBoard = initBoard();
    testBoard[13] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
    expect(checkGameBoard(testBoard)).toEqual([initBoard(), 1]);
  });
  test("Board with 3 completed lines (separated)", () => {
    let refBoard = initBoard();
    refBoard[16] = [1, 2, 3, 4, 5, 6, 7, 0, 2, 3];
    let testBoard = initBoard();
    testBoard[13] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
    testBoard[14] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
    testBoard[15] = [1, 2, 3, 4, 5, 6, 7, 0, 2, 3];
    testBoard[16] = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3];
    expect(checkGameBoard(testBoard)).toEqual([refBoard, 3]);
  });
  test("No completed line", () => {
    let refBoard = initBoard();
    refBoard[16] = [1, 2, 3, 4, 5, 6, 7, 0, 2, 3];
    expect(checkGameBoard(refBoard)).toEqual([refBoard, 0]);
  });
});

describe("Board.ts: testing checkCollisions", () => {
  test("No collision", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], 3, 0)).toEqual(true);
  });
  test("Collision with stack", () => {
    let testBoard = initBoard();
    testBoard[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    expect(checkCollisions(testBoard, piecesList[3][0], 3, 0)).toEqual(false);
  });
  test("Alongside bottom", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], 3, 18)).toEqual(true);
  });
  test("Collision with bottom", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], 3, 19)).toEqual(
      false
    );
  });
  test("Alonside left border", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], -1, 0)).toEqual(true);
  });
  test("Collision with left border", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], -2, 0)).toEqual(
      false
    );
  });
  test("Alongside right border", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], 7, 0)).toEqual(true);
  });
  test("Collision with right border", () => {
    expect(checkCollisions(initBoard(), piecesList[3][0], 8, 0)).toEqual(false);
  });
});
