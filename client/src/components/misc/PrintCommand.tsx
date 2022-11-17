export default function PrintCommand(): JSX.Element {
  return (
    <div className="Instructions">
      <p>
        Commands:
        <br />
        · ← move piece left
        <br />
        · → move piece right
        <br />
        · ↓ move piece down
        <br />
        · ↑ rotate clockwise
        <br />
        · "Space" place piece
        <br />· "S" swap current piece with queue
      </p>
    </div>
  );
}
