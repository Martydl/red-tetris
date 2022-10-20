import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { piecesList } from "../Consts";
import { updatePrintBoard, checkCollisions } from "../game/Utils";
import { Piece } from "../Types";
import { gameSlice } from "../store/GameReducer";
import { RootReducerState } from "../store/RootReducer";

export function useBlockLines(
  updateGameBoardCbk: (gameBoard: number[][], piece: Piece) => void
) {
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
  const linesToBlock = useSelector(
    (state: RootReducerState) => state.game.linesToBlock
  );

  useEffect(() => {
    if (linesToBlock !== 0) {
      const newBoard = JSON.parse(JSON.stringify(gameBoard));
      const removed = newBoard.shift();
      newBoard.push(new Array(10).fill(-1));
      if (JSON.stringify(removed) !== "[0,0,0,0,0,0,0,0,0,0]") {
        dispatch(gameSlice.actions.gameOver());
      } else {
        if (
          !checkCollisions(
            newBoard,
            piecesList[piece.name][piece.rotation],
            piece.pos.x,
            piece.pos.y
          )
        ) {
          if (piece.pos.y === 0) dispatch(gameSlice.actions.gameOver());
          else {
            updateGameBoardCbk(newBoard, {
              ...piece,
              pos: { x: piece.pos.x, y: piece.pos.y - 1 },
            });
          }
        } else {
          dispatch(gameSlice.actions.setGameBoard(newBoard));
          dispatch(
            gameSlice.actions.setPrintBoard(updatePrintBoard(newBoard, piece))
          );
        }
      }
      dispatch(gameSlice.actions.subLinesToBlock(1));
    }
  }, [linesToBlock]);
}