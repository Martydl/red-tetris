import { Button } from "@mui/material";

function Room(props: {
  room: { roomName: string; playerNb: number; gameOn: boolean };
  joinRoomCbk: (id: string) => void;
}): JSX.Element {
  const handleClick = () => {
    props.joinRoomCbk(props.room.roomName);
  };
  return (
    <>
      {props.room.roomName}
      <Button onClick={handleClick} />
    </>
  );
}

export function RoomList(props: {
  rooms: {
    [key: string]: {
      playerNb: number;
      gameOn: boolean;
    };
  };
  joinRoomCbk: (id: string) => void;
}) {
  var list: JSX.Element[] = [];
  for (let key in props.rooms) {
    list.push(
      <Room
        room={{ ...props.rooms[key], roomName: key }}
        joinRoomCbk={props.joinRoomCbk}
      />
    );
  }
}
