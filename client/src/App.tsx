import "./App.css";
import GameOn from "./game/GameOn";
import GameOver from "./game/GameOver";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "./store/RootReducer";
import { connectionSlice } from "./store/ConnectionReducer";
import { useEffect } from "react";
import { JoinRoom } from "./components/JoinRoom";

function App() {
  const dispatch = useDispatch();

  const gameOn = useSelector((state: RootReducerState) => state.game.gameOn);

  useEffect(() => {
    dispatch(connectionSlice.actions.startConnectingToSocket());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <JoinRoom />
      {(gameOn && <GameOn />) || (!gameOn && <GameOver />)}
    </div>
  );
}

export default App;
