export function PrintMatrix(props: { matrix: number[][]; class: string }) {
  const print = props.matrix.map((row, i) => {
    return (
      <div key={i} className="row">
        {row.map((block, y) => {
          return <div key={y} className="block" id={block.toString()} />;
        })}
      </div>
    );
  });
  return <div className={props.class}>{print}</div>;
}
