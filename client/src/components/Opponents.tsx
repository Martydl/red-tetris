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
      {props.opponent.playerName}
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
    ops.push(props.opponents[key]);
  }

  return (
    <div className="opponents">
      {ops.map((op, id) => (
        <PrintOpponent opponent={op} index={id} />
      ))}
    </div>
  );
}
