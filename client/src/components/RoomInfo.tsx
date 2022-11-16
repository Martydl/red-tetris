import { Button, FormControlLabel, Switch } from "@mui/material";
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
  const previousWinner = useSelector(
    (state: RootReducerState) => state.room.winner
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
      <div className="NameButton">
        <h1>{roomName}</h1>
        {isLeader && !gameOn && (
          <Button
            style={{ marginLeft: "10px", height: "10%" }}
            variant="contained"
            onClick={handleStart}
            size="small"
          >
            Start
          </Button>
        )}
      </div>
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
      <p>Players in the room: {Object.keys(roomOpponents).length + 1}</p>
      <p>Last winner: {previousWinner}</p>
    </div>
  );
}
