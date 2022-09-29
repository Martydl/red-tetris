import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "../hooks/useInterval";
import { RootReducerState } from "../reducers/RootReducer";
import { gameSlice } from "../reducers/GameReducer";
import { addPieceToMatrix } from "./Utils";
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
      {props.score}
      {props.level}
    </div>
  );
}

function Queue(props: { queue: Piece[] }) {}

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
    <div className="Board" tabIndex={0} onKeyDown={handleKeyDown}>
      <h1>Red-Tetris</h1>
      <Matrix matrix={matrixPrint} />
      <Score score={score} level={level} />
    </div>
  );
}
