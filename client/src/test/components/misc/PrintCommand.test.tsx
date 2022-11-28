import { render } from "@testing-library/react";

import PrintCommand from "../../../components/misc/PrintCommand";

describe("PrintCommand Components", () => {
  let container: HTMLElement;
  let instructions: HTMLCollectionOf<Element>;

  beforeEach(() => {
    ({ container } = render(<PrintCommand />));
    instructions = container.getElementsByClassName("Instructions");
  });

  test("PrintCommand Exist", () => {
    expect(instructions).toBeDefined;
    expect(instructions.length).toEqual(1);
  });

  test("PrintCommand Text", () => {
    const testStringInstructions =
      '<div class="Instructions"><p>Commands:<br>· ← move piece left<br>· → move piece right<br>· ↓ move piece down<br>· ↑ rotate clockwise<br>· "Space" place piece<br>· "S" swap current piece with queue</p></div>';
    expect(instructions[0].outerHTML).toEqual(testStringInstructions);
  });
});
