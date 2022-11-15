import { PlayerStatus } from "../Consts";
import { genFullShadow } from "../game/Utils";
import { Opponent } from "../store/RoomReducer";
import { PrintBoard } from "./PrintBoard";

function PrintOpponent(props: {
  opponent: Opponent;
  index: number;
}): JSX.Element {
  return (
    <div className="opponent">
      <PrintBoard
        key={props.index}
        board={genFullShadow(props.opponent.shadow)}
        class="opponentBoard"
      />
      <div className="opponentName">{props.opponent.playerName}</div>
    </div>
  );
}

export function Opponents(props: {
  opponents: {
    [id: string]: Opponent;
  };
}) {
  let ops: Opponent[] = [];

  for (let key in props.opponents) {
    if (props.opponents[key].gameOn != PlayerStatus.WAITING)
      ops.push(props.opponents[key]);
  }

  return (
    <div className="opponents">
      <p className="opponentsText">Opponents:</p>
      <div className="opponentsGrid">
        {ops.map((op, id) => (
          <PrintOpponent opponent={op} index={id} />
        ))}
      </div>
    </div>
  );
}
