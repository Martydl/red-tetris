import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import GameOn from "../game/GameOn";
import GameOver from "../game/GameOver";
import GameBegin from "../game/GameBegin";

export function Game() {
  const roomGameOn = useSelector(
    (state: RootReducerState) => state.room.gameOn
  );
  const ownGameOn = useSelector((state: RootReducerState) => state.game.gameOn);

  return (
    <div>
      {(!roomGameOn && <GameBegin />) || (ownGameOn && <GameOn />) || (
        <GameOver />
      )}
    </div>
  );
}
