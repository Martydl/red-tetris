import { act, fireEvent, screen } from "@testing-library/react";
import renderWithContext from "../RenderWithContext";

import TetrisAppBar from "../../components/TetrisAppBar";
import { connectionSlice } from "../../store/ConnectionReducer";

describe("Testing TetrisAppBar", () => {
  test("All elements are present", () => {
    renderWithContext(<TetrisAppBar />);
    expect(screen.getByAltText("tetris_logo")).toBeInTheDocument();
    expect(screen.getByText("Red-Tetris")).toBeInTheDocument();
    expect(screen.getByText("Player Name: Guest")).toBeInTheDocument();
    expect(screen.getByText("Local Best: 0")).toBeInTheDocument();
  });
  test("Logo is clickable", () => {
    const { store } = renderWithContext(<TetrisAppBar />);
    act(() => {
      store.dispatch(
        connectionSlice.actions.roomConnectionEstablished("qwerty")
      );
    });
    fireEvent.click(screen.getByAltText("tetris_logo"));
    expect(store.getState().connection.isConnectedToRoom).toBeFalsy();
  });
});
