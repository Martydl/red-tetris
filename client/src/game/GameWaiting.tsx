import { PrintBoard } from "../components/PrintBoard";
import { PrintScore } from "../components/PrintScore";
import { PrintEmptyQueue, PrintQueue } from "../components/PrintQueue";
import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import { PrintWaitScreen } from "../components/PrintWaitScreen";
import { PlayerStatus } from "../Consts";

export default function gameWaiting() {
  const board = useSelector((state: RootReducerState) => state.game.gameBoard);
  const roomGameOn = useSelector(
    (state: RootReducerState) => state.room.gameOn
  );
  const acceleration = useSelector(
    (state: RootReducerState) => state.room.acceleration
  );
  const lastScore = useSelector(
    (state: RootReducerState) => state.room.lastScore
  );
  const playerGameOn = useSelector(
    (state: RootReducerState) => state.game.gameOn
  );
  const queue = useSelector((state: RootReducerState) => state.game.queue);

  return (
    <div className="game">
      <div className="gameBoard">
        <PrintWaitScreen
          roomGameOn={roomGameOn}
          playerGameOn={playerGameOn}
          lastScore={lastScore}
        />
        <PrintBoard board={board} class="board gameOff" />
      </div>
      <div className="gameInfo">
        {(playerGameOn === PlayerStatus.WAITING && <PrintEmptyQueue />) || (
          <PrintQueue queue={queue} />
        )}
        {acceleration && playerGameOn === PlayerStatus.ALIVE && (
          <PrintScore score={0} level={0} />
        )}
      </div>
    </div>
  );
}
