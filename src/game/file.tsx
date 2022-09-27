import seedrandom from "seedrandom";
import { Piece } from "../Types";
import { piecesList } from "../Consts";
import { useEffect, useState } from "react";

function createPiece(nb: number): Piece {
  const piece: Piece = {
    grid: piecesList[nb],
    pos: {
      x: 3,
      y: 0,
    },
  };
  console.log("nb", nb, "piece", piece);
  return piece;
}

function addPieceToMatrix(
  matrix: number[][],
  piece: Piece,
  setMatrixCbk: (matrix: number[][]) => void
): void {
  let matrixToPrint = JSON.parse(JSON.stringify(matrix));
  for (let j = 0; j < piece.grid.length; j++) {
    for (let i = 0; i < piece.grid[j].length; i++) {
      if (piece.grid[j][i] === 0) {
        continue;
      }
      matrixToPrint[piece.pos.y + j][piece.pos.x + i] = piece.grid[j][i];
    }
  }
  setMatrixCbk(matrixToPrint);
}

function Matrix(props: { matrix: number[][] }) {
  console.log(props.matrix);
  const print = props.matrix.map((row, i) => {
    return <div key={i}> {row} </div>;
  });
  return <div>{print}</div>;
}

function createMatrix(): number[][] {
  var matrix: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    matrix[y] = new Array(10).fill(0);
  }
  return matrix;
}

export default function TestApp() {
  const [newPiece, setNewPiece] = useState<Piece>(createPiece(0));
  const [matrix, setMatrix] = useState<number[][]>(createMatrix());
  // const seed = Math.random(); //seed a envoyer au joueur depuis le serveur
  const seed = "dildo";
  const rngNumber = seedrandom(seed); // structure que les joueurs vont lancer pour avoir les pieces suivantes

  useEffect(() => {
    const interval = setInterval(() => {
      setNewPiece(createPiece(Math.round((rngNumber() * 100) % 6)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    addPieceToMatrix(createMatrix(), newPiece, setMatrix);
  }, [newPiece]);

  return (
    <div className="App">
      <h1>Red-Tetris</h1>
      <h2>One piece</h2>
      <Matrix matrix={newPiece.grid} />
      <h2>The matrix</h2>
      <Matrix matrix={matrix} />
    </div>
  );
}
