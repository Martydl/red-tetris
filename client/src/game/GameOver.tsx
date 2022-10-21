import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import { PrintEndScreen } from "../components/PrintEndScreen";
import { PrintBoard } from "../components/PrintBoard";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { addPieceToBoard } from "./Utils";

export default function GameOver() {
  const gameBoard = useSelector(
    (state: RootReducerState) => state.game.gameBoard
  );
  const currentPiece = useSelector(
    (state: RootReducerState) => state.game.currentPiece
  );
  const defaultDelay = useSelector(
    (state: RootReducerState) => state.game.defaultDelay
  );
  const score = useSelector((state: RootReducerState) => state.game.score);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const queue = useSelector((state: RootReducerState) => state.game.queue);

  return (
    <div className="game">
      <div>
        <PrintEndScreen score={score} />
        <PrintBoard
          board={addPieceToBoard(gameBoard, currentPiece)}
          class="board"
        />
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
    </div>
  );
}
