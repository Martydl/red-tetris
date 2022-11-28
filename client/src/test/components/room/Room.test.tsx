import { act, screen } from "@testing-library/react";
import renderWithContext from "../../RenderWithContext";

import { gameSlice } from "../../../store/GameReducer";
import { roomSlice } from "../../../store/RoomReducer";

import Room from "../../../components/room/Room";

describe("Testing Room", () => {
  test("All elements are present", () => {
    renderWithContext(<Room />);
    expect(screen.getByText("Last winner: -")).toBeInTheDocument();
    expect(screen.getByText("Commands:", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText("Waiting for next game to begin...")
    ).toBeInTheDocument();
    expect(screen.getByText("Opponents:")).toBeInTheDocument();
  });
  test("Switch between GameWaiting and GameOn", () => {
    const { store } = renderWithContext(<Room />);
    expect(
      screen.getByText("Waiting for next game to begin...")
    ).toBeInTheDocument();
    act(() => {
      store.dispatch(roomSlice.actions.startGame());
    });
    expect(
      screen.getByText("This game is in progress, please wait for it to end...")
    ).toBeInTheDocument();
    act(() => {
      store.dispatch(gameSlice.actions.setGameOn());
    });
    expect(
      screen.queryByText("Waiting for next game to begin...")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "This game is in progress, please wait for it to end..."
      )
    ).not.toBeInTheDocument();
  });
});
