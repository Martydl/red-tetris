import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "usehooks-ts";
import { RootReducerState } from "../store/RootReducer";
import { gameSlice } from "../store/GameReducer";
import {
  addPieceToBoard,
  checkGameBoard,
  createPiece,
  genShadow,
  getMalusRow,
  getShadow,
  updatePrintBoard,
} from "./Utils";
import {
  checkCollisions,
  moveBottom,
  moveLeft,
  moveRight,
  moveSecond,
  moveUp,
} from "./PieceMoves";
import { PrintMatrix } from "../components/PrintMatrix";
import { PrintQueue } from "../components/PrintQueue";
import { PrintScore } from "../components/PrintScore";
import { PrintCommand } from "../components/PrintCommand";
import { Piece } from "../Types";
import { piecesList } from "../Consts";
import React, { useRef, useState } from "react";
import seedrandom from "seedrandom";

export default function GameOn() {
  const dispatch = useDispatch();
  const gameBoard = useSelector(
    (state: RootReducerState) => state.game.gameBoard
  );
  const printBoard = useSelector(
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
  const score = useSelector((state: RootReducerState) => state.game.score);
  const level = useSelector((state: RootReducerState) => state.game.level);
  const queue = useSelector((state: RootReducerState) => state.game.queue);
  const shadow = useSelector((state: RootReducerState) => state.game.shadow);
  const opponents: number[][] = [shadow, shadow];
  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);
  const randomGen = useRef<seedrandom.PRNG>(seedrandom("dildo"));

  function updateGameBoard(gameBoard: number[][], piece: Piece): void {
    let completedLines = 0;
    let newBoard = addPieceToBoard(gameBoard, piece);
    let newPiece = createPiece(randomGen.current);
    [newBoard, completedLines] = checkGameBoard(newBoard);
    dispatch(gameSlice.actions.setGameBoard(newBoard));
    dispatch(gameSlice.actions.setShadow(genShadow(newBoard)));
    dispatch(gameSlice.actions.setCompletedLines(completedLines));
    if (checkCollisions(newBoard, piecesList[queue[0].name][0], 3, 0)) {
      dispatch(gameSlice.actions.setCurrentPiece(queue[0]));
      dispatch(
        gameSlice.actions.setPrintBoard(updatePrintBoard(newBoard, queue[0]))
      );
      dispatch(gameSlice.actions.updateQueue(newPiece));
    } else {
      dispatch(gameSlice.actions.gameOver());
      console.log("Game Over");
    }
  }

  useInterval(() => {
    if (gameOn) {
      let tmpPiece = moveSecond(gameBoard, piece, defaultDelay, (e) =>
        dispatch(gameSlice.actions.setDelay(e))
      );
      tmpPiece
        ? dispatch(gameSlice.actions.setCurrentPieceCoords(tmpPiece))
        : updateGameBoard(gameBoard, piece);
    } else {
      console.log("T'as deja perdu ?!", gameOn);
    }
  }, delay);

  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.code) {
      case "ArrowLeft":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveLeft(gameBoard, piece) ?? piece.pos
          )
        );
        break;
      case "ArrowRight":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(
            moveRight(gameBoard, piece) ?? piece.pos
          )
        );
        break;
      case "ArrowDown":
        dispatch(gameSlice.actions.setDelay(1));
        break;
      case "ArrowUp":
        dispatch(
          gameSlice.actions.setCurrentPieceRotation(
            moveUp(gameBoard, piece) ?? piece.rotation
          )
        );
        break;
      case "Space":
        dispatch(
          gameSlice.actions.setCurrentPieceCoords(moveBottom(gameBoard, piece))
        );
        dispatch(gameSlice.actions.setDelay(1));
        break;
      case "KeyS":
        dispatch(gameSlice.actions.swapPiece());
        break;
      case "NumpadAdd":
        dispatch(
          gameSlice.actions.setGameBoardMatrix(
            getMalusRow([...gameBoard], piece)
          )
        );
        break;
    }
  }

  return (
    <div className="game" tabIndex={0} onKeyDown={handleKeyDown}>
      <PrintCommand />
      <PrintMatrix matrix={printBoard} class="gameBoard" />
      <div className="gameInfo">
        <PrintQueue queue={queue} />
        <PrintScore score={score} level={level} defaultDelay={defaultDelay} />
      </div>
      <div className="shadows">
        {opponents.map((shadow, index) => (
          <PrintMatrix
            key={index}
            matrix={getShadow(shadow)}
            class="shadowBoard"
          />
        ))}
      </div>
    </div>
  );
}
