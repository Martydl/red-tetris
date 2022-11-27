import {
  PieceGrid,
  PlayerStatus,
  Coords,
  Piece,
  Opponent,
  Room,
} from "../../src/Types";

describe("Types", () => {
  const testPieceGridType: PieceGrid = [[]];
  const testCoordInterface: Coords = { x: 5, y: 10 };
  const testPieceInterface: Piece = {
    name: 1,
    rotation: 2,
    pos: testCoordInterface,
  };
  const testOpponentInterface: Opponent = {
    playerName: "playerTest",
    shadow: new Array(10).fill(0),
    status: PlayerStatus.ALIVE,
  };
  const testRoomInterface: Room = {
    name: "roomTest",
    nbPlayers: 1,
    started: false,
  };

  test("PieceGrid Type", () => {
    expect(testPieceGridType).toBeTypeOf("object");
  });

  test("PlayerStatus enum", () => {
    expect(PlayerStatus.WAITING).toEqual(-1);
    expect(PlayerStatus.DEAD).toEqual(0);
    expect(PlayerStatus.ALIVE).toEqual(1);
  });

  test("Coords Interface", () => {
    expect(Object.keys(testCoordInterface).length).toEqual(2);
    expect("x" in testCoordInterface).toEqual(true);
    expect("y" in testCoordInterface).toEqual(true);
    expect(testCoordInterface.x).toBeTypeOf("number");
    expect(testCoordInterface.y).toBeTypeOf("number");
  });

  test("Piece Interface", () => {
    expect(Object.keys(testPieceInterface).length).toEqual(3);
    expect("name" in testPieceInterface).toEqual(true);
    expect("rotation" in testPieceInterface).toEqual(true);
    expect("pos" in testPieceInterface).toEqual(true);
    expect(testPieceInterface.name).toBeTypeOf("number");
    expect(testPieceInterface.rotation).toBeTypeOf("number");
    expect(testPieceInterface.pos).toBeTypeOf("object");
  });

  test("Opponent Interface", () => {
    expect(Object.keys(testOpponentInterface).length).toEqual(3);
    expect("playerName" in testOpponentInterface).toEqual(true);
    expect("shadow" in testOpponentInterface).toEqual(true);
    expect("status" in testOpponentInterface).toEqual(true);
    expect(testOpponentInterface.playerName).toBeTypeOf("string");
    expect(testOpponentInterface.shadow).toBeTypeOf("object");
    expect(testOpponentInterface.status).toBeTypeOf("number");
  });

  test("Room Type", () => {
    expect(Object.keys(testRoomInterface).length).toEqual(3);
    expect("name" in testRoomInterface).toEqual(true);
    expect("nbPlayers" in testRoomInterface).toEqual(true);
    expect("started" in testRoomInterface).toEqual(true);
    expect(testRoomInterface.name).toBeTypeOf("string");
    expect(testRoomInterface.nbPlayers).toBeTypeOf("number");
    expect(testRoomInterface.started).toBeTypeOf("boolean");
  });
});
