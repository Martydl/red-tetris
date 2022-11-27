import { fireEvent, render, screen } from "@testing-library/react";

import RoomList from "../../../components/lobby/RoomList";

describe("Testing RoomList: component name, playerNumber and callback", () => {
  const mockCbk = jest.fn();
  beforeEach(() => {
    render(
      <RoomList
        rooms={{
          Room1: { playerNb: 3, gameOn: false },
        }}
        joinRoomCbk={mockCbk}
      />
    );
  });
  test('"Room1" is present', () => {
    expect(screen.getByText("Room1")).toBeInTheDocument();
  });
  test("Called callback with right arg", () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: /join/i,
      })
    );
    expect(mockCbk).toHaveBeenCalledWith("Room1");
  });
  test("There are 3 players in the room", () => {
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

describe("Testing RoomList: component icon", () => {
  test("Icon should be CloseIcon", () => {
    render(
      <RoomList
        rooms={{
          Room1: { playerNb: 1, gameOn: false },
        }}
        joinRoomCbk={() => {}}
      />
    );
    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
  });
  test("Icon should be CheckIcon", () => {
    render(
      <RoomList
        rooms={{
          Room1: { playerNb: 1, gameOn: true },
        }}
        joinRoomCbk={() => {}}
      />
    );
    expect(screen.getByTestId("CheckIcon")).toBeInTheDocument();
  });
});

describe("Testing RoomList: multiple rooms", () => {
  test("There should be 5 lines", () => {
    render(
      <RoomList
        rooms={{
          Room1: { playerNb: 1, gameOn: false },
          Room2: { playerNb: 1, gameOn: false },
          Room3: { playerNb: 1, gameOn: false },
          Room4: { playerNb: 1, gameOn: false },
          Room5: { playerNb: 1, gameOn: false },
        }}
        joinRoomCbk={() => {}}
      />
    );
    expect(screen.getAllByTestId("CloseIcon").length).toEqual(5);
  });
});
