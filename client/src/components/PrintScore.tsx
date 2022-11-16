export function PrintScore(props: { score: number; level: number }) {
  return (
    <div className="scorePanel">
      <div className="score">score: {props.score}</div>
      <div className="level">level: {props.level}</div>
    </div>
  );
}
