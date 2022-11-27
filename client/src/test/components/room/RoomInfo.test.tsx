import { act, fireEvent, screen } from "@testing-library/react";
import renderWithContext from "../../RenderWithContext";

import { connectionSlice } from "../../../store/ConnectionReducer";
import { roomSlice } from "../../../store/RoomReducer";

import RoomInfo from "../../../components/room/RoomInfo";

describe("Testing RoomInfo", () => {
  test("All elements are present", () => {
    const { store } = renderWithContext(<RoomInfo />);
    act(() => {
      store.dispatch(
        connectionSlice.actions.socketConnectionEstablished("qwerty")
      );
      store.dispatch(
        roomSlice.actions.initRoom({
          roomName: "roomTest",
          leaderId: "qwerty",
          opponents: {},
          gameOn: false,
          acceleration: true,
        })
      );
    });
    expect(screen.getByText("roomTest")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /start/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Players in the room: 1")).toBeInTheDocument();
    expect(screen.getByText("Last winner: -")).toBeInTheDocument();
  });
  test("Acceleration can be toggled and game can be started", () => {
    const { store } = renderWithContext(<RoomInfo />);
    act(() => {
      store.dispatch(
        connectionSlice.actions.socketConnectionEstablished("qwerty")
      );
      store.dispatch(
        roomSlice.actions.initRoom({
          roomName: "roomTest",
          leaderId: "qwerty",
          opponents: {
            opponent1: {
              playerName: "azerty",
              shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              status: 0,
            },
          },
          gameOn: false,
          acceleration: true,
        })
      );
    });
    fireEvent.click(screen.getByText("Acceleration"));
    expect(store.getState().room.startingGame).toBeFalsy();
    fireEvent.click(screen.getByText("Start"));
    expect(store.getState().room.startingGame).toBeTruthy();
  });
});
