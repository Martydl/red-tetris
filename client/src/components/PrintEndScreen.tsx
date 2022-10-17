export function PrintEndScreen(props: { score: number }) {
    return (
      <div className="gameOver">
        <p>
          Game Over
          <br/>
          score: {props.score}
        </p>
      </div>
    );
  }
  