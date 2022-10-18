import "./App.css";
import GameOn from "./game/GameOn";
import GameOver from "./game/GameOver";
import socketIo from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "./store/RootReducer";
import { socketSlice } from "./store/SocketReducer";
import { useEffect } from "react";

// const socket = socketIo();
// console.log(socket);

function App() {
  const dispatch = useDispatch();

  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);

  useEffect(() => {
    dispatch(socketSlice.actions.startConnecting());
  }, []);

  return <div>{(gameOn && <GameOn />) || (!gameOn && <GameOver />)}</div>;
}

export default App;
