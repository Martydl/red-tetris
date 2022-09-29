import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "../hooks/useInterval";
import { RootReducerState } from "../reducers/RootReducer";
import { gameSlice } from "../reducers/GameReducer";
import { addPieceToMatrix } from "./Utils";
import { piecesList } from "../Consts";

import {
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./pieceMoves";
import { Piece } from "../Types";

function Score(props: { score: number; level: number }) {
  return (
    <div>
      <div className="score">score: {props.score}</div>
      <div className="level">level: {props.level}</div>
    </div>
  );
}

function Queue(props: { queue: Piece[] }) {
  const print = props.queue.map((piece, i) => {
    return (
      <div key={i} className="futurePiece">
        <Matrix matrix={piecesList[piece.name][0]} />
      </div>
    );
  });
  return <div className="board1">{print}</div>;
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
  return <div className="gameBoard">{print}</div>;
}

export default function Game() {
  const dispatch = useDispatch();
  const matrix = useSelector(
    (state: RootReducerState) => state.game.gameMatrix
  );
  const matrixPrint = useSelector(
    (state: RootReducerState) => state.game.printMatrix
  );
  const piece = useSelector(
    (state: RootReducerState) => state.game.currentPiece
  );
  const delay = useSelector((state: RootReducerState) => state.game.delay);
  const score = useSelector((state: RootReducerState) => state.game.score);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const queue = useSelector((state: RootReducerState) => state.game.queue);

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.code) {
      case "ArrowLeft":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveLeft(matrix, piece) ?? piece.pos
          )
        );
        break;
      case "ArrowRight":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveRight(matrix, piece) ?? piece.pos
          )
        );
        break;
      case "ArrowDown":
        dispatch(gameSlice.actions.setDelay(1));
        break;
      case "ArrowUp":
        dispatch(
          gameSlice.actions.setCurrentPieceRotation(
            moveUp(matrix, piece) ?? piece.rotation
          )
        );
        break;
      case "Space":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(moveBottom(matrix, piece))
        );
        dispatch(gameSlice.actions.setDelay(1));
        break;
    }
  }

  useInterval(() => {
    let tmpPiece = moveSecond(matrix, piece, (e) =>
      dispatch(gameSlice.actions.setDelay(e))
    );
    tmpPiece
      ? dispatch(gameSlice.actions.setCurrentPieceCoords(tmpPiece))
      : dispatch(
          gameSlice.actions.updateGameMatrix(addPieceToMatrix(matrix, piece))
        );
  }, delay);

  return (
    <div className="game" tabIndex={0} onKeyDown={handleKeyDown}>
      <Matrix matrix={matrixPrint} />
      <div className="gameInfo">
        <Queue queue={queue} />
        <Score score={score} level={level} />
      </div>
    </div>
  );
}
