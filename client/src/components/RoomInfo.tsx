import { Button, FormControlLabel, Switch } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomSlice } from "../store/RoomReducer";
import { RootReducerState } from "../store/RootReducer";

export function RoomInfo() {
  const dispatch = useDispatch();
  const roomName = useSelector(
    (state: RootReducerState) => state.room.roomName
  );
  const roomOpponents = useSelector(
    (state: RootReducerState) => state.room.opponents
  );
  const gameOn = useSelector((state: RootReducerState) => state.room.gameOn);
  const myId = useSelector(
    (state: RootReducerState) => state.connection.socketId
  );
  const leaderId = useSelector(
    (state: RootReducerState) => state.room.leaderId
  );
  const acceleration = useSelector(
    (state: RootReducerState) => state.room.acceleration
  );
  const opponents = useSelector(
    (state: RootReducerState) => state.room.opponents
  );

  const isLeader = myId === leaderId;
  const multiplayer = Object.keys(opponents).length > 0;

  const handleStart = () => {
    dispatch(roomSlice.actions.lauchGame());
  };

  const handleAccelerationSwitch = () => {
    dispatch(roomSlice.actions.toggleAcceleration());
  };

  return (
    <div className="RoomInfos">
      <p>
        Room Name: {roomName}
        {isLeader && !gameOn && (
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            onClick={handleStart}
          >
            Start
          </Button>
        )}
      </p>
      <FormControlLabel
        style={{ marginLeft: "0" }}
        control={
          <Switch
            color="primary"
            checked={acceleration}
            disabled={!isLeader || !multiplayer || gameOn}
            onChange={handleAccelerationSwitch}
          />
        }
        label="Acceleration"
        labelPlacement="start"
      />
      <p>Number of Player: {Object.keys(roomOpponents).length + 1}</p>
    </div>
  );
}
