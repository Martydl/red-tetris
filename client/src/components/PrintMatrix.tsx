function ListBlock(props: { block: number }): JSX.Element {
  return <div className="block" id={props.block.toString()} />;
}

function ListRow(props: { row: number[] }): JSX.Element {
  return (
    <div className="row">
      {props.row.map((block, index) => (
        <ListBlock key={index} block={block} />
      ))}
    </div>
  );
}

export function PrintMatrix(props: { matrix: number[][]; class: string }) {
  return (
    <div className={props.class}>
      {props.matrix.map((row, index) => (
        <ListRow key={index} row={row} />
      ))}
    </div>
  );
}
