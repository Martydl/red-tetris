import "./App.css";
import GameOn from "./game/GameOn";
import GameOver from "./game/GameOver";
import socketIo from "socket.io-client";
import { useSelector } from "react-redux";
import { RootReducerState } from "./reducers/RootReducer";


const socket = socketIo();
console.log(socket);

function App() {
  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);

  return (
    <div>
      {gameOn && <GameOn /> || !gameOn && <GameOver />}
    </div>
  );
}

export default App;
