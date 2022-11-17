import { describe, expect, test } from "vitest";

import {
  addPieceToBoard,
  updatePrintBoard,
  checkGameBoard,
  checkCollisions,
} from "../../../client/src/utils/Board";

import { initBoard, initPiece } from "../../../client/src/utils/Init";

describe("Board.ts: testing addPieceToBoard", () => {
  test("Add square in initial position to empty matrix", () => {
    let testBoard = initBoard();
    testBoard[0][4] = 4;
    testBoard[0][5] = 4;
    testBoard[1][4] = 4;
    testBoard[1][5] = 4;
    expect(addPieceToBoard(initBoard(), initPiece(3))).toEqual(testBoard);
  });
  test("Add T alongside left border", () => {
    let testBoard = initBoard();
    testBoard[14][1] = 6;
    testBoard[15][0] = 6;
    testBoard[15][1] = 6;
    testBoard[16][1] = 6;
    let piece = initPiece(5);
    piece.pos = { x: -1, y: 14 };
    piece.rotation = 3;
    expect(addPieceToBoard(initBoard(), piece)).toEqual(testBoard);
  });
});

describe("Board.ts: testing updatePrintBoard", () => {
  test("Basic piece on top with shadow", () => {
    let testBoard = initBoard();
    testBoard[0][4] = 4;
    testBoard[0][5] = 4;
    testBoard[1][4] = 4;
    testBoard[1][5] = 4;
    testBoard[18][4] = 11;
    testBoard[18][5] = 11;
    testBoard[19][4] = 11;
    testBoard[19][5] = 11;
    const piece = initPiece(3);
    const initialBoard = addPieceToBoard(initBoard(), piece);
    expect(updatePrintBoard(initialBoard, piece)).toEqual(testBoard);
  });
});
