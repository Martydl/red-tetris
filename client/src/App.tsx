import "./App.css";
import Game from "./game/Game";
import socketIo from "socket.io-client";

const socket = socketIo();
console.log(socket);

function App() {
  return <Game />;
}

export default App;
