import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { roomSlice } from "../store/RoomReducer";
import { RootReducerState } from "../store/RootReducer";

export function RoomInfo() {
  const dispatch = useDispatch();
  const roomName = useSelector(
    (state: RootReducerState) => state.room.roomName
  );
  const leaderId = useSelector(
    (state: RootReducerState) => state.room.leaderId
  );
  const myId = useSelector(
    (state: RootReducerState) => state.connection.socketId
  );

  const handleStart = () => {
    dispatch(roomSlice.actions.lauchGame());
  };

  console.log(myId, leaderId);

  return (
    <div>
      {roomName}
      {myId === leaderId && (
        <Button variant="contained" onClick={handleStart}>
          Start
        </Button>
      )}
    </div>
  );
}
