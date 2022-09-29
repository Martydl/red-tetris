export type PieceGrid = number[][];

export interface Position {
  x: number;
  y: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Piece {
  name: number;
  rotation: number;
  pos: Coords;
}
