import { useDispatch } from "react-redux";
import { gameSlice } from "../store/GameReducer";
import { moveBottom, moveLeft, moveRight, moveUp } from "./PieceMoves";
import { getMalusRow } from "./Utils";
import { Piece } from "../Types";

export default function keyHandler(
  event: React.KeyboardEvent,
  matrix: number[][],
  piece: Piece
): void {
  const dispatch = useDispatch();

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
    case "KeyS":
      dispatch(gameSlice.actions.swapPiece());
      break;
    case "NumpadAdd":
      dispatch(
        gameSlice.actions.setGameBoardMatrix(getMalusRow([...matrix], piece))
      );
      break;
  }
}
