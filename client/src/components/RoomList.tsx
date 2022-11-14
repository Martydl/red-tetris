import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

type Room = {
  name: string;
  nbPlayers: number;
  started: boolean;
};

export function RoomList(props: {
  rooms: {
    [key: string]: {
      playerNb: number;
      gameOn: boolean;
    };
  };
  joinRoomCbk: (id: string) => void;
}) {
  const handleClick = (name: string) => {
    props.joinRoomCbk(name);
  };

  var roomList: Room[] = [];
  for (let key in props.rooms) {
    roomList.push({
      name: key,
      nbPlayers: props.rooms[key].playerNb,
      started: props.rooms[key].gameOn,
    });
    console.log("gameOn: ", props.rooms[key].gameOn);
  }

  return (
    <TableContainer className="RoomList" component={Paper}>
      <Table sx={{ minWidth: "fit-content" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room&nbsp;Name</TableCell>
            <TableCell align="center">Number&nbsp;Players</TableCell>
            <TableCell align="center">Started</TableCell>
            <TableCell align="center">Join</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomList.map((room: any) => (
            <TableRow
              key={room.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {room.name}
              </TableCell>
              <TableCell align="center">{room.nbPlayers}</TableCell>
              <TableCell align="center">
                {(room.started && <CheckIcon />) || <CloseIcon />}
              </TableCell>
              <TableCell align="center">
                <Button onClick={() => handleClick(room.name)}>Join</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
