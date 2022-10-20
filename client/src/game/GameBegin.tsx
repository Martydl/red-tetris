import { PrintBoard } from "../components/PrintBoard";
import { PrintScore } from "../components/PrintScore";
import { initBoard } from "./Utils";
import { emptyPiece } from "../Consts";

function EmptyPiece(): JSX.Element {
  return (
    <div className="futurePiece">
      <PrintBoard board={emptyPiece} class="gameBoard" />
    </div>
  );
}

function PrintEmptyQueue() {
  return (
    <div className="piecesList">
      <EmptyPiece />
      <EmptyPiece />
      <EmptyPiece />
    </div>
  );
}

// CSS à rajouter pour afficher la grilles même hors focus
export default function gameBegin() {
  const board = initBoard();

  return (
    <div className="game">
      <div>
        <PrintBoard board={board} class="gameBoard" />
      </div>
      <div className="gameInfo">
        <PrintEmptyQueue />
        <PrintScore score={0} level={0} defaultDelay={42} />
      </div>
    </div>
  );
}
