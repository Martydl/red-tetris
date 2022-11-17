import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import PrintScore from "../../../client/src/components/misc/PrintScore";
import React from "react";

describe("PrintScore Components", () => {
  const score_value = 12549;
  const level_value = 4;
  const { container } = render(
    <PrintScore score={score_value} level={level_value} />
  );

  test("PrintScore Length", () => {
    const scorePanel = container.getElementsByClassName("scorePanel");
    expect(scorePanel).toBeDefined;
    expect(scorePanel.length).toEqual(1);
    expect(scorePanel[0].childElementCount).toEqual(2);
  });

  test("PrintScore Child Content", () => {
    const score = container.getElementsByClassName("score");
    const level = container.getElementsByClassName("level");
    expect(score[0].textContent).toEqual("score: " + score_value);
    expect(level[0].textContent).toEqual("level: " + level_value);
  });
});
