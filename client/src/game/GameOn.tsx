import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "usehooks-ts";
import { RootReducerState } from "../reducers/RootReducer";
import { gameSlice } from "../reducers/GameReducer";
import { addPieceToBoard, getMalusRow, getShadow } from "./Utils";
import {
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./PieceMoves";
import { PrintMatrix } from "../components/PrintMatrix";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";

export default function GameOn() {
  const dispatch = useDispatch();
  const matrixPrint = useSelector(
    (state: RootReducerState) => state.game.printBoard
  );
  const piece = useSelector(
    (state: RootReducerState) => state.game.currentPiece
  );
  const delay = useSelector(
    (state: RootReducerState) => state.game.currentDelay
  );
  const defaultDelay = useSelector(
    (state: RootReducerState) => state.game.defaultDelay
  );
  const matrix = useSelector((state: RootReducerState) => state.game.gameBoard);
  const score = useSelector((state: RootReducerState) => state.game.score);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const queue = useSelector((state: RootReducerState) => state.game.queue);
  const shadow = useSelector((state: RootReducerState) => state.game.shadow);
  const opponents: number[][] = [shadow, shadow];
  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);

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
      case "KeyS":
        console.log("Pourquoi on ne veut pas me swap avec ma soeur :'| snif");
        dispatch(gameSlice.actions.swapPiece());
        break;
      case "NumpadAdd":
        dispatch(
          gameSlice.actions.setGameBoardMatrix(getMalusRow([...matrix], piece))
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
    if (gameOn) {
      let tmpPiece = moveSecond(matrix, piece, defaultDelay, (e) =>
        dispatch(gameSlice.actions.setDelay(e))
      );
      tmpPiece
        ? dispatch(gameSlice.actions.setCurrentPieceCoords(tmpPiece))
        : dispatch(
            gameSlice.actions.updateGameBoard(addPieceToBoard(matrix, piece))
          );
    } else {
      console.log("T'as deja perdu ?!", gameOn);
    }
  }, delay);

  return (
    <div className="game" tabIndex={0} onKeyDown={handleKeyDown}>
      <div>
        <p>
          command:
          <br />
          · ← / → move piece
          <br />
          · ↓ falling piece
          <br />
          · ↑ rotate clockwise
          <br />
          · "Space" place piece
          <br />
          · "S" swap piece with next piece
          <br />· "+" add malus
        </p>
      </div>
      <PrintMatrix matrix={matrixPrint} class="gameBoard" />
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, i) => {
          return <PrintMatrix matrix={getShadow(shadow)} class="shadowBoard" />;
        })}
      </div>
    </div>
  );
}
