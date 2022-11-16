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
  const acceleration = useSelector(
    (state: RootReducerState) => state.room.acceleration
  );
  const score = useSelector((state: RootReducerState) => state.game.score);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const queue = useSelector((state: RootReducerState) => state.game.queue);

  return (
    <div className="game">
      <div>
        <div className="gameBoard">
          <PrintEndScreen score={acceleration ? score : undefined} />
          <PrintBoard
            board={addPieceToBoard(gameBoard, currentPiece)}
            class="board gameOff"
          />
        </div>
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
      </div>
    </div>
  );
}
