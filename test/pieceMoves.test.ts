import { describe, expect, it } from "vitest";
import * as pieceMoves from "../client/src/game/PieceMoves";
import { initMatrix, initPiece } from "../client/src/game/Utils";
import { piecesList } from "../client/src/Consts";

describe("Function in Utils.ts", () => {
  let matrix = initMatrix();
  let piece = initPiece(0);

  it("checkCollisions", () => {
    expect(
      pieceMoves.checkCollisions(
        matrix,
        piecesList[piece.name][piece.rotation],
        3,
        0
      )
    ).toEqual(true);
  });

  // it("moveSecond", () => {
  //   expect(pieceMoves.moveSecond(matrix, piece, 1000, setDelay())).toEqual();
  // });

  it("moveLeftWithoutCollisions", () => {
    expect(pieceMoves.moveLeft(matrix, piece)).toEqual({ x: 2, y: 0 });
  });

  it("moveLeftWithCollisions", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest.shift();
    matrixTest.shift();
    matrixTest.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    matrixTest.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(pieceMoves.moveLeft(matrixTest, piece)).toEqual(undefined);
  });

  it("moveRightWithoutCollisions", () => {
    expect(pieceMoves.moveRight(matrix, piece)).toEqual({ x: 4, y: 0 });
  });

  it("moveRightWithCollisions", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest.shift();
    matrixTest.shift();
    matrixTest.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    matrixTest.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(pieceMoves.moveRight(matrixTest, piece)).toEqual(undefined);
  });

  it("moveUpWithoutCollisions", () => {
    expect(pieceMoves.moveUp(matrix, piece)).toEqual(1);
  });

  it("moveUpWithCollisions", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest.shift();
    matrixTest.shift();
    matrixTest.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    matrixTest.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(pieceMoves.moveUp(matrixTest, piece)).toEqual(undefined);
  });

  it("moveBottom", () => {
    expect(pieceMoves.moveBottom(matrix, piece)).toEqual({ x: 3, y: 18 });
  });
});
