import { act, fireEvent, screen } from "@testing-library/react";
import renderWithContext from "../../RenderWithContext";

import Lobby from "../../../components/lobby/Lobby";
import { connectionSlice } from "../../../store/ConnectionReducer";

describe("Testing Lobby: changing and submitting playerName", () => {
  test('PlayerName textfield should be "qwerty", then empty and "qwerty" put in the store ', () => {
    const { store } = renderWithContext(<Lobby />);
    const nameField = screen.getByLabelText(
      "Edit your name"
    ) as HTMLInputElement;
    fireEvent.change(nameField, {
      target: { value: "qwerty" },
    });
    expect(nameField.value).toEqual("qwerty");
    fireEvent.click(
      screen.getByRole("button", {
        name: /edit/i,
      })
    );
    expect(nameField.value).toEqual("");
    expect(store.getState().connection.playerName).toEqual("qwerty");
  });
});

describe("Testing Lobby: changing and submitting roomName", () => {
  test('RoomName textfiled should be "azerty" then "azerty" should be intercepted', () => {
    const { store } = renderWithContext(<Lobby />);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    const roomField = screen.getByLabelText("Join Room") as HTMLInputElement;
    fireEvent.change(roomField, {
      target: { value: "azerty" },
    });
    expect(roomField.value).toEqual("azerty");
    fireEvent.click(
      screen.getByRole("button", {
        name: /join/i,
      })
    );
    expect(dispatchSpy).toBeCalledWith({
      payload: "azerty",
      type: "socket/startConnectingToRoom",
    });
    expect(store.getState().connection.isConnectingToRoom).toBeTruthy();
  });
});

describe("Testing Lobby: connecting to existing room", () => {
  test('Connection to existing room "Room1"', () => {
    const { store } = renderWithContext(<Lobby />);
    act(() => {
      store.dispatch(
        connectionSlice.actions.setRoomList({
          Room1: { playerNb: 2, gameOn: false },
        })
      );
    });
    const buttons = screen.getAllByRole("button", {
      name: /join/i,
    });
    fireEvent.click(buttons[1]);
    expect(store.getState().connection.isConnectingToRoom).toBeTruthy();
  });
});

describe("Testing Lobby: connecting to room with empty name", () => {
  test("Should not start connection", () => {
    const { store } = renderWithContext(<Lobby />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /join/i,
      })
    );
    expect(store.getState().connection.isConnectingToRoom).toBeFalsy();
  });
});
