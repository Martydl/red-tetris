import { PrintMatrix } from "./PrintMatrix";
import { Piece } from "../Types";
import { piecesList } from "../Consts";

function ListPiece(props: { name: number; rotation: number }): JSX.Element {
  return (
    <div className="futurePiece">
      <PrintMatrix
        matrix={piecesList[props.name][props.rotation]}
        class="gameBoard"
      />
    </div>
  );
}

export function PrintQueue(props: { queue: Piece[] }) {
  return (
    <div className="piecesList">
      {props.queue.map((piece, index) => (
        <ListPiece key={index} name={piece.name} rotation={piece.rotation} />
      ))}
    </div>
  );
}
