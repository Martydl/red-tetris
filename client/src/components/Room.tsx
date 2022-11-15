import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import GameOn from "../game/GameOn";
import GameOver from "../game/GameOver";
import GameBegin from "../game/GameBegin";
import { Opponents } from "./Opponents";
import { RoomInfo } from "./RoomInfo";
import { PrintCommand } from "./PrintCommand";

export function Room() {
  const roomGameOn = useSelector(
    (state: RootReducerState) => state.room.gameOn
  );
  const ownGameOn = useSelector((state: RootReducerState) => state.game.gameOn);
  const opponents = useSelector(
    (state: RootReducerState) => state.room.opponents
  );

  return (
    <div className="Room">
      <div className="Infos">
        <RoomInfo />
        <PrintCommand />
      </div>
      {((!roomGameOn || (roomGameOn && !ownGameOn)) && <GameBegin />) ||
        (ownGameOn && <GameOn />) || <GameOver />}
      <Opponents opponents={opponents} />
    </div>
  );
}
