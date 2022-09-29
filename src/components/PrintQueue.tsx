import { PrintMatrix } from "./PrintMatrix";
import { Piece } from "../Types";
import { piecesList } from "../Consts";

export function PrintQueue(props: { queue: Piece[] }) {
  const print = props.queue.map((piece, i) => {
    return (
      <div key={i} className="futurePiece">
        <PrintMatrix matrix={piecesList[piece.name][0]} />
      </div>
    );
  });
  return <div className="board1">{print}</div>;
}
