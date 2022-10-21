import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { connectionSlice } from "../store/ConnectionReducer";
import { RootReducerState } from "../store/RootReducer";
import { RoomList } from "./RoomList";

export function Lobby() {
  const dispatch = useDispatch();
  const roomList = useSelector(
    (state: RootReducerState) => state.connection.roomList
  );
  const [roomName, setRoomName] = useState<string>("");

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(connectionSlice.actions.startConnectingToRoom(roomName));
  };

  const handleSubmit2 = (room: string) => {
    dispatch(connectionSlice.actions.startConnectingToRoom(room));
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <TextField
          id="roomName"
          label="Join Room"
          variant="filled"
          value={roomName}
          onChange={handleNameChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          JOIN
        </Button>
      </div>
      <RoomList rooms={roomList} joinRoomCbk={handleSubmit2} />
    </>
  );
}
