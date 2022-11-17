import { Piece } from "../../Types";
import { emptyPiece, piecesList } from "../../Consts";
import React from "react";

import PrintBoard from "./PrintBoard";

function EmptyPiece(): JSX.Element {
  return (
    <div className="queueMember">
      <PrintBoard board={emptyPiece} class="board" />
    </div>
  );
}

export function PrintEmptyQueue(): JSX.Element {
  return (
    <div className="queue">
      <EmptyPiece />
      <EmptyPiece />
      <EmptyPiece />
    </div>
  );
}

function PrintPiece(props: { name: number; rotation: number }): JSX.Element {
  return (
    <div className="queueMember">
      <PrintBoard
        board={piecesList[props.name][props.rotation]}
        class="board"
      />
    </div>
  );
}

export default function PrintQueue(props: { queue: Piece[] }): JSX.Element {
  return (
    <div className="queue">
      {props.queue.map((piece, index) => (
        <PrintPiece key={index} name={piece.name} rotation={piece.rotation} />
      ))}
    </div>
  );
}
