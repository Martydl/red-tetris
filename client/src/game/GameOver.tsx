import { useSelector } from "react-redux";
import { RootReducerState } from "../reducers/RootReducer";
import { PrintEndScreen } from "../components/PrintEndScreen";
import { PrintMatrix } from "../components/PrintMatrix";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { getShadow } from "./Utils";

export default function GameOn() {
  const matrixPrint = useSelector(
    (state: RootReducerState) => state.game.printBoard
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
      <div>
        <p>
          command:<br/>
          · ← / → move piece<br/>
          · ↓ falling piece<br/>
          · ↑ rotate clockwise<br/>
          · "Space" place piece<br/>
          · "S" swap piece with next piece<br/>
          · "+" add malus
        </p>
      </div>
      <div>
        <PrintEndScreen score={score} />
        <PrintMatrix matrix={matrixPrint} class="gameBoard" />
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, i) => {
          return <PrintMatrix matrix={getShadow(shadow)} class="shadowBoard" />;
        })}
      </div>
    </div>
  );
}
