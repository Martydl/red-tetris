function Score(props: { score: number }) {
  return <>Score: {props.score}</>;
}

export function PrintEndScreen(props: { score: number | undefined }) {
  return (
    <div className="gameOver">
      <p>
        Game Over
        <br />
        {props.score !== undefined && <Score score={props.score} />}
      </p>
    </div>
  );
}
