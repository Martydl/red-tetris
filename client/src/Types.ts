export type PieceGrid = number[][];

export enum PlayerStatus {
  WAITING = -1,
  DEAD,
  ALIVE,
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

export interface Opponent {
  playerName: string;
  shadow: number[];
  status: PlayerStatus;
}

export type Room = {
  name: string;
  nbPlayers: number;
  started: boolean;
};
