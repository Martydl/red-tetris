import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import PrintWaitScreen from "../../../client/src/components/misc/PrintWaitScreen";
import { PlayerStatus } from "../../../client/src/Types";
import React from "react";

describe("PrintWaitScreen Components", () => {
  test("PrintWaitScreen Viewer", () => {
    const { container } = render(
      <PrintWaitScreen
        roomGameOn={true}
        playerGameOn={PlayerStatus.ALIVE}
        lastScore={undefined}
      />
    );
    const waitScreen = container.getElementsByClassName("waitScreen");
    expect(waitScreen).toBeDefined;
    expect(waitScreen.length).toEqual(1);
    expect(waitScreen[0].textContent).toEqual(
      "This game is in progress, please wait for it to end..."
    );
  });

  test("PrintWaitScreen GameOver Waiting", () => {
    const { container } = render(
      <PrintWaitScreen
        roomGameOn={false}
        playerGameOn={PlayerStatus.DEAD}
        lastScore={2245}
      />
    );
    const waitScreen = container.getElementsByClassName("waitScreen");
    expect(waitScreen[0].textContent).toEqual(
      "Game OverScore: 2245Waiting for next game to begin..."
    );
  });
  test("PrintWaitScreen GameOver", () => {
    const { container } = render(
      <PrintWaitScreen
        roomGameOn={false}
        playerGameOn={PlayerStatus.DEAD}
        lastScore={undefined}
      />
    );
    const waitScreen = container.getElementsByClassName("waitScreen");
    expect(waitScreen[0].textContent).toEqual(
      "Game OverWaiting for next game to begin..."
    );
  });
});
