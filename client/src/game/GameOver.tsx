import { useSelector } from "react-redux";
import { RootReducerState } from "../reducers/RootReducer";
import { PrintEndScreen } from "../components/PrintEndScreen";
import { PrintMatrix } from "../components/PrintMatrix";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { PrintCommand } from "../components/PrintCommand";
import { addPieceToBoard, getShadow } from "./Utils";

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
  const shadow = useSelector((state: RootReducerState) => state.game.shadow);
  const opponents: number[][] = [shadow, shadow];

  return (
    <div className="game">
      <PrintCommand />
      <div>
        <PrintEndScreen score={score} />
        <PrintMatrix
          matrix={addPieceToBoard(gameBoard, currentPiece)}
          class="gameBoard"
        />
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, index) => (
          <PrintMatrix
            key={index}
            matrix={getShadow(shadow)}
            class="shadowBoard"
          />
        ))}
      </div>
    </div>
  );
}
