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

  function handleRoute() {
    let roomName: string | undefined = undefined;
    let playerName: string | undefined = undefined;
    const hash = window.location.hash;
    if (/^#[A-Za-z0-9]+\[[A-Za-z0-9]+]$/.test(hash)) {
      [roomName, playerName] = hash.match(/[A-Za-z0-9]+/g) as string[];
    } else if (/^#[A-Za-z0-9]+$/.test(hash)) {
      [roomName] = hash.match(/[A-Za-z0-9]+/) as string[];
    }

    if (roomName) {
      dispatch(connectionSlice.actions.roomDisconnect());
      if (playerName)
        dispatch(connectionSlice.actions.setPlayerName(playerName));
      dispatch(connectionSlice.actions.startConnectingToRoom(roomName));
    }
  }

  useEffect(() => {
    dispatch(connectionSlice.actions.startConnectingToSocket());

    window.addEventListener("hashchange", handleRoute);
    handleRoute();
    return () => {
      window.removeEventListener("hashchange", handleRoute);
    };
  }, []);

  return (
    <div className="App">
      <AppBar />
      {(!isConnectedToRoom && <Lobby />) || (isConnectedToRoom && <Room />)}
    </div>
  );
}

export default App;
