import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "usehooks-ts";
import { RootReducerState } from "../reducers/RootReducer";
import { gameSlice } from "../reducers/GameReducer";
import { addPieceToBoard } from "./Utils";
import {
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./pieceMoves";
import { PrintMatrix } from "../components/PrintMatrix";
import { PrintQueue } from "../components/PrintQueue";

function Score(props: { score: number; level: number; defaultDelay: number }) {
  return (
    <div>
      <div className="score">score: {props.score}</div>
      <div className="level">level: {props.level}</div>
      <div className="speed">speed: {props.defaultDelay}</div>
    </div>
  );
}

function getShadow(shadow: number[]): number[][] {
  var realOne: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    realOne[y] = new Array(10);
    for (let x = 0; x < 10; x++) {
      realOne[y][x] = y < 20 - shadow[x] ? 0 : 15;
    }
  }
  return realOne;
}

export default function Game() {
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
  const gameOver = useSelector((state: RootReducerState) => state.game.gameOver);

  function handleKeyDown(event: React.KeyboardEvent) {
    // console.log('keycode: ', event.code);
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
        console.log("Plus 1 malus, tu vas faire quoi ?");
        dispatch(gameSlice.actions.getMalusRow(1));
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
    if (!gameOver) {
      let tmpPiece = moveSecond(matrix, piece, defaultDelay, (e) =>
        dispatch(gameSlice.actions.setDelay(e))
      );
      tmpPiece
        ? dispatch(gameSlice.actions.setCurrentPieceCoords(tmpPiece))
        : dispatch(
            gameSlice.actions.updateGameBoard(addPieceToBoard(matrix, piece))
          );
    }
    else {
      console.log("T'as deja perdu ?!",gameOver)
    }
  }, delay);

  return (
    <div className="game" tabIndex={0} onKeyDown={handleKeyDown}>
      <div>
        <p>
          command:<br/>
          · ← / → move piece<br/>
          · ↓ falling piece<br/>
          · ↑ rotate clockwise<br/>
          · "Space" place piece<br/>
          · "S" swap piece with next piece<br/>
          · "+" add malus
        </p>
      </div>
      <PrintMatrix matrix={matrixPrint} class="gameBoard" />
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <Score score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, i) => {
          return <PrintMatrix matrix={getShadow(shadow)} class="shadowBoard" />;
        })}
      </div>
    </div>
  );
}
