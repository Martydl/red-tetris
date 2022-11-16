export function PrintBegScreen(props: { gameOn: boolean }) {
  return (
    <div className="gameBegin">
      {(props.gameOn && (
        <p>A game is in progress, please wait for it to end...</p>
      )) || <p>Waiting for the game to begin...</p>}
    </div>
  );
}
