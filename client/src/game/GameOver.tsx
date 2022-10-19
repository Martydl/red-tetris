import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import { PrintEndScreen } from "../components/PrintEndScreen";
import { PrintBoard } from "../components/PrintBoard";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { PrintCommand } from "../components/PrintCommand";
import { addPieceToBoard, genFullShadow } from "./Utils";

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
        <PrintBoard
          board={addPieceToBoard(gameBoard, currentPiece)}
          class="gameBoard"
        />
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, index) => (
          <PrintBoard
            key={index}
            board={genFullShadow(shadow)}
            class="shadowBoard"
          />
        ))}
      </div>
    </div>
  );
}
