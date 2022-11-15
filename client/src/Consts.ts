import { PieceGrid } from "./Types";

export enum Messages {
  JOIN_ROOM = "JOIN_ROOM",
  NEW_SHADOW = "NEW_SHADOW",
  LINES_DESTROYED = "LINES_DESTROYED",
  PLAYER_GAME_OVER = "PLAYER_GAME_OVER",
  START_GAME = "START_GAME",
  END_GAME = "END_GAME",
  GET_PIECE = "GET_PIECE",
  WAITING_ROOM = "WAITING_ROOM",
  ROOM_INFO = "ROOM_INFO",
  ROOM_LIST = "ROOM_LIST",
  GAME_STATUS = "GAME_STATUS",
  SEND_OPPONENT = "SEND_OPPONENT",
  LEADER_ID = "LEADER_ID",
  OPPONENTS_SHADOWS = "OPPONENTS_SHADOWS",
  LINES_TO_BLOCK = "LINES_TO_BLOCK",
  DELETE_OPPONENT = "DELETE_OPPONENT",
  TOGGLE_ACCELERATION = "TOGGLE_ACCELERATION",
  ROOM_DISCONNECT = "ROOM_DISCONNECT",
}

export enum PlayerStatus {
  WAITING = -1,
  DEAD,
  ALIVE,
}

export const emptyPiece: PieceGrid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const piece1: PieceGrid[] = [
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

const piece2: PieceGrid[] = [
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
  ],
];

const piece3: PieceGrid[] = [
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
  ],
];

const piece4: PieceGrid[] = [
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
  ],
];

const piece5: PieceGrid[] = [
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
  ],
];

const piece6: PieceGrid[] = [
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
  ],
];

const piece7: PieceGrid[] = [
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
  ],
];

export const piecesList: PieceGrid[][] = [
  piece1,
  piece2,
  piece3,
  piece4,
  piece5,
  piece6,
  piece7,
];
