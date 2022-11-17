import { useSelector } from "react-redux";

import { PlayerStatus } from "../../Types";

import { RootReducerState } from "../../store/RootReducer";

import GameOn from "./GameOn";
import GameWaiting from "./GameWaiting";
import RoomInfo from "./RoomInfo";
import Opponents from "./Opponents";
import PrintCommand from "../misc/PrintCommand";

export default function Room(): JSX.Element {
  const playerGameOn = useSelector(
    (state: RootReducerState) => state.game.gameOn
  );
  const opponents = useSelector(
    (state: RootReducerState) => state.room.opponents
  );

  return (
    <div className="Room">
      <div className="Infos">
        <RoomInfo />
        <PrintCommand />
      </div>
      {(playerGameOn !== PlayerStatus.ALIVE && <GameWaiting />) || <GameOn />}
      <Opponents opponents={opponents} />
    </div>
  );
}
