import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "usehooks-ts";
import { useBlockLines } from "../hooks/useBlockLines";
import { RootReducerState } from "../store/RootReducer";
import { gameSlice } from "../store/GameReducer";
import {
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./PieceMoves";
import {
  addPieceToBoard,
  checkGameBoard,
  genShadow,
  updatePrintBoard,
  checkCollisions,
} from "./Utils";
import { PrintBoard } from "../components/PrintBoard";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { Piece } from "../Types";
import { piecesList } from "../Consts";
import { connectionSlice } from "../store/ConnectionReducer";

export default function GameOn() {
  const dispatch = useDispatch();
  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);
  const gameBoard = useSelector(
    (state: RootReducerState) => state.game.gameBoard
  );
  const printBoard = useSelector(
    (state: RootReducerState) => state.game.printBoard
  );
  const currentPiece = useSelector(
    (state: RootReducerState) => state.game.currentPiece
  );
  const queue = useSelector((state: RootReducerState) => state.game.queue);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const score = useSelector((state: RootReducerState) => state.game.score);
  const currentDelay = useSelector(
    (state: RootReducerState) => state.game.currentDelay
  );
  const defaultDelay = useSelector(
    (state: RootReducerState) => state.game.defaultDelay
  );
  const accelerationBool = useSelector(
    (state: RootReducerState) => state.game.acceleration != 0
  );

  function updateGameBoard(gameBoard: number[][], piece: Piece): void {
    let completedLines = 0;
    let newBoard = addPieceToBoard(gameBoard, piece);
    [newBoard, completedLines] = checkGameBoard(newBoard);
    dispatch(gameSlice.actions.setGameBoard(newBoard));
    dispatch(gameSlice.actions.setShadow(genShadow(newBoard)));
    if (completedLines > 0)
      dispatch(gameSlice.actions.setCompletedLines(completedLines));
    if (checkCollisions(newBoard, piecesList[queue[0].name][0], 3, 0)) {
      dispatch(
        gameSlice.actions.setPrintBoard(updatePrintBoard(newBoard, queue[0]))
      );
      dispatch(gameSlice.actions.setCurrentPiece(queue[0]));
    } else {
      dispatch(connectionSlice.actions.setBestScore([score, accelerationBool]));
      dispatch(gameSlice.actions.gameOver());
      console.log("Game Over");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.code) {
      case "ArrowLeft":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveLeft(gameBoard, currentPiece) ?? currentPiece.pos
          )
        );
        break;
      case "ArrowRight":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveRight(gameBoard, currentPiece) ?? currentPiece.pos
          )
        );
        break;
      case "ArrowDown":
        dispatch(gameSlice.actions.setDelay(1));
        break;
      case "ArrowUp":
        dispatch(
          gameSlice.actions.setCurrentPieceRotation(
            moveUp(gameBoard, currentPiece) ?? currentPiece.rotation
          )
        );
        break;
      case "Space":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveBottom(gameBoard, currentPiece)
          )
        );
        dispatch(gameSlice.actions.setDelay(1));
        break;
      case "KeyS":
        dispatch(gameSlice.actions.swapPiece());
        break;
    }
  }

  useBlockLines(updateGameBoard);

  useInterval(() => {
    if (gameOn) {
      let tmpPiece = moveSecond(gameBoard, currentPiece, defaultDelay, (e) =>
        dispatch(gameSlice.actions.setDelay(e))
      );
      tmpPiece
        ? dispatch(gameSlice.actions.setCurrentPieceCoords(tmpPiece))
        : updateGameBoard(gameBoard, currentPiece);
    } else {
      console.log("T'as deja perdu ?!", gameOn);
    }
  }, currentDelay);

  useEffect(() => {}, []);

  return (
    <div className="game" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="gameBoard">
        <PrintBoard board={printBoard} class="board" />
      </div>
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} />
      </div>
    </div>
  );
}
