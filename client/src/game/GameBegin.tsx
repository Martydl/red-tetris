import { PrintBoard } from "../components/PrintBoard";
import { PrintScore } from "../components/PrintScore";
import { initBoard } from "./Utils";
import { PrintEmptyQueue } from "../components/PrintQueue";
import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import { PrintBegScreen } from "../components/PrintBegScreen";

export default function gameBegin() {
  const board = initBoard();
  const gameOn = useSelector((state: RootReducerState) => state.room.gameOn);
  const acceleration = useSelector(
    (state: RootReducerState) => state.room.acceleration
  );

  return (
    <div className="game">
      <div className="gameBoard">
        <PrintBegScreen gameOn={gameOn} />
        <PrintBoard board={board} class="board gameOff" />
      </div>
      <div className="gameInfo">
        <PrintEmptyQueue />
        {acceleration && <PrintScore score={0} level={0} />}
      </div>
    </div>
  );
}
