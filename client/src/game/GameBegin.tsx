import { PrintBoard } from "../components/PrintBoard";
import { PrintScore } from "../components/PrintScore";
import { initBoard } from "./Utils";
import { PrintEmptyQueue } from "../components/PrintQueue";

// CSS à rajouter pour afficher la grilles même hors focus
export default function gameBegin() {
  const board = initBoard();

  return (
    <div className="game">
      <div>
        <PrintBoard board={board} class="board" />
      </div>
      <div className="gameInfo">
        <PrintEmptyQueue />
        <PrintScore score={0} level={0} defaultDelay={42} />
      </div>
    </div>
  );
}
