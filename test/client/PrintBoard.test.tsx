import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import PrintBoard from "../../client/src/components/misc/PrintBoard";
import React from "react";

describe("PrintBoard Components", () => {
  let testNumberArray = [
    new Array(5).fill(0),
    new Array(5).fill(0),
    new Array(5).fill(0),
    new Array(5).fill(0),
    new Array(5).fill(0),
  ];
  const { container } = render(
    <PrintBoard board={testNumberArray} class="board" />
  );

  test("PrintBoard Length", () => {
    const blocks = container.getElementsByClassName("block");
    expect(blocks.length).toBe(25);
  });

  test("Rows Length", () => {
    const rows = container.getElementsByClassName("row");
    expect(rows.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      expect(rows[i].getElementsByClassName("block").length).toBe(5);
    }
  });
});
