import { describe, expect, it } from "vitest";
import * as utils from "../client/src/game/Utils";

describe("Function in Utils.ts", () => {
  let matrix: number[][] = [
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

  it("initMatrix", () => {
    expect(utils.initMatrix()).toEqual(matrix);
  });

  it("initPiece", () => {
    let pieceTest = {
      name: 0,
      rotation: 0,
      pos: { x: 3, y: 0 },
    };
    expect(utils.initPiece(0)).toEqual(pieceTest);
  });

  // test("initQueue", () => {
  //   let queue: Piece[] = [];
  //   queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  //   queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  //   queue.push(initPiece(Math.round(randomGen() * 100) % 7));
  //   expect(utils.initQueue()).eq();
  // });

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
    expect(utils.getPoints(7, 3)).toEqual(2400);
  });

  it("getMalusRow", () => {
    let matrixTest: number[][] = JSON.parse(JSON.stringify(matrix));
    matrixTest.shift();
    matrixTest.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    expect(utils.getMalusRow(matrix, piece)).toEqual(matrixTest);
  });

  it("getShadow", () => {
    let matrixTest: number[][] = [
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
    expect(utils.getShadow([0, 5, 5, 10, 15, 15, 10, 5, 5, 0])).toEqual(
      matrixTest
    );
  });
});
