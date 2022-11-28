import { PlayerStatus, Opponent } from "../../Types";
import { genFullShadow } from "../../utils/Shadow";

import PrintBoard from "../misc/PrintBoard";

function PrintOpponent(props: { opponent: Opponent }): JSX.Element {
  return (
    <div className="opponent">
      <PrintBoard
        board={genFullShadow(props.opponent.shadow)}
        class={
          props.opponent.status !== PlayerStatus.DEAD
            ? "opponentBoard"
            : "opponentDead"
        }
      />
      <div className="opponentName">{props.opponent.playerName}</div>
    </div>
  );
}

export default function Opponents(props: {
  opponents: {
    [id: string]: Opponent;
  };
}): JSX.Element {
  let ops: Opponent[] = [];

  for (let key in props.opponents) {
    if (props.opponents[key].status !== PlayerStatus.WAITING)
      ops.push(props.opponents[key]);
  }

  return (
    <div className="opponents">
      <p className="opponentsText">Opponents:</p>
      <div className="opponentsGrid">
        {ops.map((op, id) => (
          <PrintOpponent opponent={op} key={id} />
        ))}
      </div>
    </div>
  );
}
