import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { getStore } from "../store/Store";

export default function renderWithContext(component: JSX.Element) {
  const store = getStore();
  render(<Provider store={store}>{component}</Provider>);
  return { store };
}
