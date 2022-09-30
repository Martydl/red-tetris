import { useState } from "react";
import "./App.css";
import Game from "./game/Game";

function App() {
  const [count, setCount] = useState(0);

  return <Game />;
}

export default App;
