import { PrintMatrix } from "./PrintMatrix";
import { Piece } from "../Types";
import { piecesList } from "../Consts";

export function PrintQueue(props: { queue: Piece[] }) {
  const print = props.queue.map((piece, i) => {
    return (
      <div key={i} className="futurePiece">
        <PrintMatrix
          matrix={piecesList[piece.name][piece.rotation]}
          class="gameBoard"
        />
      </div>
    );
  });
  return <div className="piecesList">{print}</div>;
}
