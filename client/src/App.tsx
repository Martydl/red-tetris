import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "./store/RootReducer";
import { connectionSlice } from "./store/ConnectionReducer";
import { useEffect } from "react";
import { Lobby } from "./components/Lobby";
import { Game } from "./components/Game";

function App() {
  const dispatch = useDispatch();

  const isConnectedToRoom = useSelector(
    (state: RootReducerState) => state.connection.isConnectedToRoom
  );

  useEffect(() => {
    dispatch(connectionSlice.actions.startConnectingToSocket());
  }, []);

  return (
    <div>
      {(!isConnectedToRoom && <Lobby />) || (isConnectedToRoom && <Game />)}
    </div>
  );
}

export default App;
