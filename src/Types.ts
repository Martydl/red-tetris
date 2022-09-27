export type PieceGrid = number[][];

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  grid: PieceGrid;
  pos: Position;
}
