import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "./store/RootReducer";
import { connectionSlice } from "./store/ConnectionReducer";
import { useEffect } from "react";
import { Lobby } from "./components/Lobby";
import { Room } from "./components/Room";
import AppBar from "./components/TetrisAppBar";

function App() {
  const dispatch = useDispatch();

  const isConnectedToRoom = useSelector(
    (state: RootReducerState) => state.connection.isConnectedToRoom
  );

  useEffect(() => {
    dispatch(connectionSlice.actions.startConnectingToSocket());
  }, []);

  return (
    <div className="App">
      {/* <div className="Header">Header</div> */}
      <AppBar></AppBar>
      {(!isConnectedToRoom && <Lobby />) || (isConnectedToRoom && <Room />)}
    </div>
  );
}

export default App;
