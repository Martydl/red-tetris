import { PlayerStatus } from "../Consts";

export function PrintWaitScreen(props: {
  roomGameOn: boolean;
  playerGameOn: PlayerStatus;
  lastScore: number | undefined;
}) {
  return (
    <div className="waitScreen">
      <p>
        {(props.lastScore !== undefined && (
          <p>
            Game Over
            <br />
            Score: {props.lastScore}
          </p>
        )) ||
          (props.playerGameOn === PlayerStatus.DEAD && <p>Game Over</p>)}

        {(props.roomGameOn && (
          <p>This game is in progress, please wait for it to end...</p>
        )) || <p>Waiting for next game to begin...</p>}
      </p>
    </div>
  );
}
