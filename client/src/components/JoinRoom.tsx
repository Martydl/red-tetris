import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { connectionSlice } from "../store/ConnectionReducer";

export function JoinRoom() {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState<string>("");

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(connectionSlice.actions.startConnectingToRoom(roomName));
  };

  return (
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
  );
}
