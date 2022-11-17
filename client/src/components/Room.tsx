import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";
import GameOn from "../game/GameOn";
import GameWaiting from "../game/GameWaiting";
import { Opponents } from "./Opponents";
import { RoomInfo } from "./RoomInfo";
import { PrintCommand } from "./PrintCommand";
import { PlayerStatus } from "../Consts";

export function Room() {
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
      {(ownGameOn !== PlayerStatus.ALIVE && <GameWaiting />) || <GameOn />}
      <Opponents opponents={opponents} />
    </div>
  );
}
