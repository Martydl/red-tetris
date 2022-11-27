import Piece from "../Piece";

test("constructor", () => {
  let piece = new Piece(14);
  expect(piece.name).toBe(Math.round(14 * 100) % 7);
});
