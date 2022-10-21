import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

function Room(props: {
  room: { roomName: string; playerNB: number; gameOn: boolean };
  joinRoomCbk: (id: string) => void;
}): JSX.Element {
  const { roomName, playerNB, gameOn } = props.room;

  console.log("TEST:", roomName, playerNB, gameOn);

  const handleClick = () => {
    props.joinRoomCbk(roomName);
  };

  return (
    <TableRow>
      <TableCell>{roomName}</TableCell>
      <TableCell>{playerNB}</TableCell>
      <TableCell>
        {(gameOn && <Checkbox disabled checked />) || (
          <Checkbox disabled checked />
        )}
      </TableCell>
      <TableCell>
        <Button onClick={handleClick}>Join</Button>
      </TableCell>
    </TableRow>
  );
}

export function RoomList(props: {
  rooms: {
    [key: string]: {
      playerNB: number;
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room Name</TableCell>
            <TableCell>Number Players</TableCell>
            <TableCell>Started</TableCell>
            <TableCell>Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{roomList}</TableBody>
      </Table>
    </TableContainer>
  );
}
