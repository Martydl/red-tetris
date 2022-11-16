import { expect, it, describe } from "vitest";
import { Messages, PlayerStatus } from "../../server/src/Consts";

describe("Consts enum", () => {
  it("Messages", () => {
    expect(Messages.END_GAME).toEqual("END_GAME");
    expect(Messages.GET_PIECE).toEqual("GET_PIECE");
    expect(Messages.JOIN_ROOM).toEqual("JOIN_ROOM");
    expect(Messages.ROOM_LIST).toEqual("ROOM_LIST");
    expect(Messages.ROOM_INFO).toEqual("ROOM_INFO");
    expect(Messages.NEW_SHADOW).toEqual("NEW_SHADOW");
    expect(Messages.START_GAME).toEqual("START_GAME");
    expect(Messages.WAITING_ROOM).toEqual("WAITING_ROOM");
    expect(Messages.SET_ALL_ALIVE).toEqual("SET_ALL_ALIVE");
    expect(Messages.SEND_OPPONENT).toEqual("SEND_OPPONENT");
    expect(Messages.NEW_PLAYER_NAME).toEqual("NEW_PLAYER_NAME");
    expect(Messages.ROOM_DISCONNECT).toEqual("ROOM_DISCONNECT");
    expect(Messages.LINES_DESTROYED).toEqual("LINES_DESTROYED");
    expect(Messages.DELETE_OPPONENT).toEqual("DELETE_OPPONENT");
    expect(Messages.PLAYER_GAME_OVER).toEqual("PLAYER_GAME_OVER");
    expect(Messages.TOGGLE_ACCELERATION).toEqual("TOGGLE_ACCELERATION");
  });

  it("PlayerStatus", () => {
    expect(PlayerStatus.WAITING).toEqual(-1);
    expect(PlayerStatus.DEAD).toEqual(0);
    expect(PlayerStatus.ALIVE).toEqual(1);
  });
});
