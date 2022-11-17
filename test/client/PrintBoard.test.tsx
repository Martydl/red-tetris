import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  test("should show title all the time", () => {
    const { container } = render(
      <PrintBoard board={testNumberArray} class="board" />
    );
    const rows = container.getElementsByClassName("row");
    const blocks = container.getElementsByClassName("block");

    expect(rows.length).toBe(5);
    for (let key in rows) {
      console.log("ICI key: ", key);
      console.log("ICI row: ", rows[key]);
      // expect(.getElementsByClassName("block").length).toBe(5);
    }
    expect(blocks.length).toBe(25);
  });
});
