import { useSelector } from "react-redux";

import { PlayerStatus } from "../../Types";

import { RootReducerState } from "../../store/RootReducer";

import PrintBoard from "../misc/PrintBoard";
import PrintQueue, { PrintEmptyQueue } from "../misc/PrintQueue";
import PrintScore from "../misc/PrintScore";
import PrintWaitScreen from "../misc/PrintWaitScreen";

export default function gameWaiting(): JSX.Element {
  const board = useSelector((state: RootReducerState) => state.game.gameBoard);
  const roomGameOn = useSelector(
    (state: RootReducerState) => state.room.gameOn
  );
  const playerGameOn = useSelector(
    (state: RootReducerState) => state.game.gameOn
  );
  const queue = useSelector((state: RootReducerState) => state.game.queue);
  const acceleration = useSelector(
    (state: RootReducerState) => state.room.acceleration
  );
  const lastScore = useSelector(
    (state: RootReducerState) => state.room.lastScore
  );

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
