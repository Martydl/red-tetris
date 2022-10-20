import "./App.css";
import GameOn from "./game/GameOn";
import GameOver from "./game/GameOver";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "./store/RootReducer";
import { connectionSlice } from "./store/ConnectionReducer";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);

  useEffect(() => {
    dispatch(connectionSlice.actions.startConnecting());
  }, []);

  return <div>{(gameOn && <GameOn />) || (!gameOn && <GameOver />)}</div>;
}

export default App;
