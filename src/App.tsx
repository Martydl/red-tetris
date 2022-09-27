import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TestApp from "./game/file";

function App() {
  const [count, setCount] = useState(0);

  return <TestApp />;
}

export default App;
