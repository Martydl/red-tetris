import { Button } from "@mui/material";

function Room(props: {
  room: { roomName: string; playerNb: number; gameOn: boolean };
  joinRoomCbk: (id: string) => void;
}): JSX.Element {
  const { roomName, playerNb, gameOn } = props.room;

  const handleClick = () => {
    props.joinRoomCbk(roomName);
  };

  return (
    <div key={roomName}>
      {roomName}
      {playerNb}
      {gameOn}
      <Button onClick={handleClick}>Join</Button>
    </div>
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
  var roomList: JSX.Element[] = [];
  for (let key in props.rooms) {
    roomList.push(
      <Room
        room={{ ...props.rooms[key], roomName: key }}
        joinRoomCbk={props.joinRoomCbk}
      />
    );
  }
  return <div>{roomList}</div>;
}
