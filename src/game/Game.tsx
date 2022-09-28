import seedrandom from "seedrandom";
import { Piece } from "../Types";
import { piecesList } from "../Consts";
import { useEffect, useRef, useState } from "react";
import {
  checkCollisions,
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./pieceMoves";
import { useInterval } from "../hooks/useInterval";
import { initMatrix } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../reducers/RootReducer";
import { gameSlice } from "../reducers/GameReducer";

function createPiece(nb: number): Piece {
  const piece: Piece = {
    name: nb,
    rotation: 0,
    x: 3,
    y: 0,
  };
  return piece;
}

function addPieceToMatrix(matrix: number[][], piece: Piece): number[][] {
  let matrixToPrint = JSON.parse(JSON.stringify(matrix));
  for (let j = 0; j < piecesList[piece.name % 7][piece.rotation].length; j++) {
    for (
      let i = 0;
      i < piecesList[piece.name % 7][piece.rotation][j].length;
      i++
    ) {
      if (piecesList[piece.name % 7][piece.rotation][j][i] === 0) {
        continue;
      }
      matrixToPrint[piece.y + j][piece.x + i] = piece.name + 1;
    }
  }
  return matrixToPrint;
}

function Matrix(props: { matrix: number[][] }) {
  const print = props.matrix.map((row, i) => {
    return (
      <div key={i} className="row">
        {row.map((block, y) => {
          return <div key={y} className="block" id={block.toString()} />;
        })}
      </div>
    );
  });
  return <div className="board">{print}</div>;
}

function initQueue(rngNumber: any): Piece[] {
  let queue: Piece[] = [];
  queue.push(createPiece(Math.round(rngNumber.current() * 100) % 7));
  queue.push(createPiece(Math.round(rngNumber.current() * 100) % 7));
  queue.push(createPiece(Math.round(rngNumber.current() * 100) % 7));
  return queue;
}

// function checkLine(matrix: number[][]): number[][] {
//   for (let y = 0; y < matrix.length; y++) {
//     if (!matrix[y].includes(0)) {
//       matrix.splice(y, 1);
//       matrix.unshift(new Array(10).fill(0));
//     }
//   }
//   return matrix;
// }

export default function Game() {
  const dispatch = useDispatch();
  const matrix = useSelector(
    (state: RootReducerState) => state.game.gameMatrix
  );
  const seed = "dildo3";
  const rngNumber = useRef<any>(seedrandom(seed)); // structure que les joueurs vont lancer pour avoir les pieces suivantes
  const [piece, setPiece] = useState<Piece>(
    createPiece(Math.round(rngNumber.current() * 100) % 7)
  );
  const [matrixPrint, setMatrixPrint] = useState<number[][]>(initMatrix());
  const [delay, setDelay] = useState(1000);
  const [queue, setQueue] = useState<Piece[]>(initQueue(rngNumber));
  // const seed = Math.random(); //seed a envoyer au joueur depuis le serveur

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.code) {
      case "ArrowLeft":
        setPiece(moveLeft(matrix, piece) ?? piece);
        break;
      case "ArrowRight":
        setPiece(moveRight(matrix, piece) ?? piece);
        break;
      case "ArrowDown":
        setDelay(1);
        break;
      case "ArrowUp":
        setPiece(moveUp(matrix, piece) ?? piece);
        break;
      case "Space":
        setPiece(moveBottom(matrix, piece));
        setDelay(1);
        break;
    }
  }

  useInterval(() => {
    let tmpPiece = moveSecond(matrix, piece, setDelay);
    if (tmpPiece) {
      setPiece(tmpPiece);
    } else {
      dispatch(
        gameSlice.actions.setGameMatrix(addPieceToMatrix(matrix, piece))
      );
    }
  }, delay);

  useEffect(() => {
    setMatrixPrint(
      addPieceToMatrix(
        addPieceToMatrix(
          matrix,
          moveBottom(matrix, { ...piece, name: piece.name + 7 })
        ),
        piece
      )
    );
  }, [piece]);

  useEffect(() => {
    dispatch(gameSlice.actions.checkMatrixLines());

    if (checkCollisions(matrix, piecesList[queue[0].name][0], 3, 0)) {
      setPiece(queue[0]);
    } else {
      console.log("Game Over");
    }
    let tmp_queue = queue;
    tmp_queue.splice(0, 1);
    console.log(tmp_queue);
    tmp_queue.push(createPiece(Math.round(rngNumber.current() * 100) % 7));
    setQueue(tmp_queue);
  }, [matrix]);

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  //   document.getElementsByClassName('Board').focus();

  return (
    <div className="Board" tabIndex={0} onKeyDown={handleKeyDown}>
      <h1>Red-Tetris</h1>
      {/* <h2>One piece</h2>
      <Matrix matrix={piecesList[piece.name][piece.rotation]} /> */}
      <h2>The matrix</h2>
      <Matrix matrix={matrixPrint} />
    </div>
  );
}
