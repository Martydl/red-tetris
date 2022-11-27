import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootReducerState } from "./store/RootReducer";
import { connectionSlice } from "./store/ConnectionReducer";

import AppBar from "./components/TetrisAppBar";
import Lobby from "./components/lobby/Lobby";
import Room from "./components/room/Room";

function App() {
  const dispatch = useDispatch();
  const isConnectedToRoom = useSelector(
    (state: RootReducerState) => state.connection.isConnectedToRoom
  );

  function handleRoute(): void {
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
    dispatch(
      connectionSlice.actions.setBestScore(
        Number(localStorage.getItem("bestScore"))
      )
    );
    return () => {
      window.removeEventListener("hashchange", handleRoute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <AppBar />
      {(!isConnectedToRoom && <Lobby />) || <Room />}
    </div>
  );
}

export default App;
