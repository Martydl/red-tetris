import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import PrintQueue, {
  PrintEmptyQueue,
} from "../../../client/src/components/misc/PrintQueue";
import React from "react";

describe("PrintQueue Components", () => {
  test("PrintQueue Length", () => {
    const piece1 = { name: 3, rotation: 2, pos: { x: 0, y: 0 } };
    const piece2 = { name: 2, rotation: 1, pos: { x: 0, y: 0 } };
    const piece3 = { name: 1, rotation: 3, pos: { x: 0, y: 0 } };
    const queue = [piece1, piece2, piece3];
    const { container } = render(<PrintQueue queue={queue} />);
    const queueMember = container.getElementsByClassName("queueMember");
    expect(queueMember).toBeDefined;
    expect(queueMember.length).toEqual(3);
  });

  test("PrintEmptyQueue Length", () => {
    const { container } = render(<PrintEmptyQueue />);
    const queueMember = container.getElementsByClassName("queueMember");
    expect(queueMember).toBeDefined;
    expect(queueMember.length).toEqual(3);
  });
});
