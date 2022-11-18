import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";

import { connectionSlice } from "../../store/ConnectionReducer";
import { RootReducerState } from "../../store/RootReducer";
import { RoomList } from "./RoomList";

export default function Lobby(): JSX.Element {
  const dispatch = useDispatch();
  const roomList = useSelector(
    (state: RootReducerState) => state.connection.roomList
  );
  const [roomName, setRoomName] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPlayerName(event.target.value);
  };

  const submitNewPlayerName = (): void => {
    dispatch(connectionSlice.actions.setPlayerName(playerName));
    setPlayerName("");
  };

  const handleRoomNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRoomName(event.target.value);
  };

  const handleDirectConnection = (): void => {
    if (roomName !== "")
      dispatch(connectionSlice.actions.startConnectingToRoom(roomName));
  };

  const handleExistingConnection = (room: string): void => {
    dispatch(connectionSlice.actions.startConnectingToRoom(room));
  };

  return (
    <div className="LobbyBody">
      <div className="Fields">
        <div className="NameField">
          <TextField
            id="changePlayerName"
            label="Edit your name"
            variant="filled"
            value={playerName}
            onChange={handlePlayerNameChange}
            autoFocus
          />
          <Button variant="contained" onClick={submitNewPlayerName}>
            EDIT
          </Button>
        </div>
        <div className="RoomField">
          <TextField
            id="roomName"
            label="Join Room"
            variant="filled"
            value={roomName}
            onChange={handleRoomNameChange}
            autoFocus
          />
          <Button variant="contained" onClick={handleDirectConnection}>
            JOIN
          </Button>
        </div>
      </div>
      <div className="RoomList">
        <RoomList rooms={roomList} joinRoomCbk={handleExistingConnection} />
      </div>
    </div>
  );
}
