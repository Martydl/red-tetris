export function PrintScore(props: {
  score: number;
  level: number;
  defaultDelay: number;
}) {
  return (
    <div>
      <div className="score">score: {props.score}</div>
      <div className="level">level: {props.level}</div>
      <div className="speed">speed: {props.defaultDelay}</div>
    </div>
  );
}
