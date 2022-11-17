import { describe, expect, it } from "vitest";
import { piecesList } from "../client/src/Consts";
import * as utils from "../client/src/game/Utils";
import { Piece } from "../client/src/Types";
import seedrandom from "seedrandom";

describe("Function in Utils.ts", () => {
  let matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let piece = utils.initPiece(0);
  let matrixShadow = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 0, 15, 15, 0, 0, 0, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 0, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 0, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 0, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 0, 0],
    [0, 0, 0, 15, 15, 15, 15, 0, 0, 0],
    [0, 15, 15, 15, 15, 15, 15, 15, 15, 0],
    [0, 15, 15, 15, 15, 15, 15, 15, 15, 0],
    [0, 15, 15, 15, 15, 15, 15, 15, 15, 0],
    [0, 15, 15, 15, 15, 15, 15, 15, 15, 0],
    [0, 15, 15, 15, 15, 15, 15, 15, 15, 0],
  ];
  let shadow = [0, 5, 5, 10, 15, 15, 10, 5, 5, 0];

  it("addPieceToBoard", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest[1][3] = 1;
    matrixTest[1][4] = 1;
    matrixTest[1][5] = 1;
    matrixTest[1][6] = 1;
    expect(utils.addPieceToBoard(matrix, piece)).toEqual(matrixTest);
  });

  it("updatePrintBoard", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest[1][3] = 1;
    matrixTest[1][4] = 1;
    matrixTest[1][5] = 1;
    matrixTest[1][6] = 1;
    matrixTest[19][3] = 8;
    matrixTest[19][4] = 8;
    matrixTest[19][5] = 8;
    matrixTest[19][6] = 8;
    expect(utils.updatePrintBoard(matrix, piece)).toEqual(matrixTest);
  });

  it("getPoints", () => {
    expect(utils.getPoints(3, 1)).toEqual(160);
    expect(utils.getPoints(5, 2)).toEqual(600);
    expect(utils.getPoints(7, 3)).toEqual(2400);
    expect(utils.getPoints(9, 4)).toEqual(12000);
    expect(utils.getPoints(7, 0)).toEqual(0);
  });

  it("genShadow", () => {
    expect(utils.genShadow(matrixShadow)).toEqual(shadow);
  });

  it("genFullShadow", () => {
    expect(utils.genFullShadow(shadow)).toEqual(matrixShadow);
  });

  it("checkCollisions", () => {
    expect(
      utils.checkCollisions(
        matrix,
        piecesList[piece.name][piece.rotation],
        3,
        0
      )
    ).toEqual(true);
  });
});
