import { render, screen } from "@testing-library/react";
import Opponents from "../../../components/room/Opponents";

describe("Testing Opponents", () => {
  test("No opponents", () => {
    render(<Opponents opponents={{}} />);
    expect(screen.getByText("Opponents:")).toBeInTheDocument();
  });
  test("One opponent playing and one waiting", () => {
    render(
      <Opponents
        opponents={{
          opponent1: {
            playerName: "azerty",
            shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            status: 0,
          },
          opponent2: {
            playerName: "qwerty",
            shadow: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            status: -1,
          },
        }}
      />
    );
    expect(screen.getByText("azerty")).toBeInTheDocument();
    expect(screen.queryByText("qwerty")).not.toBeInTheDocument();
  });
});
