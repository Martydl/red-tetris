import { Button, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { roomSlice } from "../store/RoomReducer";
import { RootReducerState } from "../store/RootReducer";

export function RoomInfo() {
  const dispatch = useDispatch();
  const roomName = useSelector(
    (state: RootReducerState) => state.room.roomName
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

  return (
    <div className="RoomInfos">
      {roomName}
      {isLeader && !gameOn && (
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
      )}
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={acceleration}
            disabled={!isLeader || !multiplayer}
          />
        }
        label="Acceleration"
        labelPlacement="start"
      />
    </div>
  );
}
