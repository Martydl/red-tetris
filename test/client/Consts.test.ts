import { describe, expect, test } from "vitest";
import { Messages, emptyPiece, piecesList } from "../../client/src/Consts";
import React from "react";

describe("Consts", () => {
  test("Messages Const", () => {
    expect(Messages.JOIN_ROOM).toEqual("JOIN_ROOM");
    expect(Messages.NEW_SHADOW).toEqual("NEW_SHADOW");
    expect(Messages.LINES_DESTROYED).toEqual("LINES_DESTROYED");
    expect(Messages.PLAYER_GAME_OVER).toEqual("PLAYER_GAME_OVER");
    expect(Messages.START_GAME).toEqual("START_GAME");
    expect(Messages.END_GAME).toEqual("END_GAME");
    expect(Messages.GET_PIECE).toEqual("GET_PIECE");
    expect(Messages.WAITING_ROOM).toEqual("WAITING_ROOM");
    expect(Messages.ROOM_INFO).toEqual("ROOM_INFO");
    expect(Messages.ROOM_LIST).toEqual("ROOM_LIST");
    expect(Messages.GAME_STATUS).toEqual("GAME_STATUS");
    expect(Messages.SEND_OPPONENT).toEqual("SEND_OPPONENT");
    expect(Messages.LEADER_ID).toEqual("LEADER_ID");
    expect(Messages.OPPONENTS_SHADOWS).toEqual("OPPONENTS_SHADOWS");
    expect(Messages.LINES_TO_BLOCK).toEqual("LINES_TO_BLOCK");
    expect(Messages.DELETE_OPPONENT).toEqual("DELETE_OPPONENT");
    expect(Messages.TOGGLE_ACCELERATION).toEqual("TOGGLE_ACCELERATION");
    expect(Messages.ROOM_DISCONNECT).toEqual("ROOM_DISCONNECT");
  });

  test("emptyPiece Const", () => {
    const testEmptyNumberArray = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    expect(emptyPiece).toEqual(testEmptyNumberArray);
  });

  describe("piecesList Const", () => {
    test("piece1", () => {
        const testNumberArray = [
            [
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            [
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0],
            ],
            [
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [1, 1, 1, 1],
              [0, 0, 0, 0],
            ],
            [
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
            ],
          ];
        expect(piecesList[0]).toEqual(testNumberArray);
    });
  });

  test("piece2", () => {
      const testNumberArray = [
        [
            [0, 2, 0, 0],
            [0, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 2, 2],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [0, 2, 2, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[1]).toEqual(testNumberArray);
  });

  test("piece3", () => {
      const testNumberArray = [
        [
            [0, 0, 0, 3],
            [0, 3, 3, 3],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 3, 0],
            [0, 0, 3, 0],
            [0, 0, 3, 3],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [0, 3, 3, 3],
            [0, 3, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 3, 3, 0],
            [0, 0, 3, 0],
            [0, 0, 3, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[2]).toEqual(testNumberArray);
  });

  test("piece4", () => {
      const testNumberArray = [
        [
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[3]).toEqual(testNumberArray);
  });

  test("piece5", () => {
      const testNumberArray = [
        [
            [0, 0, 5, 5],
            [0, 5, 5, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 5, 0],
            [0, 0, 5, 5],
            [0, 0, 0, 5],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 5, 5],
            [0, 5, 5, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 5, 0, 0],
            [0, 5, 5, 0],
            [0, 0, 5, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[4]).toEqual(testNumberArray);
  });

  test("piece6", () => {
      const testNumberArray = [
        [
            [0, 0, 6, 0],
            [0, 6, 6, 6],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 6, 0],
            [0, 0, 6, 6],
            [0, 0, 6, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [0, 6, 6, 6],
            [0, 0, 6, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 6, 0],
            [0, 6, 6, 0],
            [0, 0, 6, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[5]).toEqual(testNumberArray);
  });

  test("piece7", () => {
      const testNumberArray = [
        [
            [0, 7, 7, 0],
            [0, 0, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 7],
            [0, 0, 7, 7],
            [0, 0, 7, 0],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [0, 7, 7, 0],
            [0, 0, 7, 7],
            [0, 0, 0, 0],
          ],
          [
            [0, 0, 7, 0],
            [0, 7, 7, 0],
            [0, 7, 0, 0],
            [0, 0, 0, 0],
          ]
        ];
      expect(piecesList[6]).toEqual(testNumberArray);
  });
});
