import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootReducerState } from "../store/RootReducer";

export default function TetrisAppBar() {
  const playerName = useSelector(
    (state: RootReducerState) => state.connection.playerName
  );
  return (
    <div className="Header">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <img className="Icon" src="/tetris_ico.png" alt="tetris_logo" />
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Red-Tetris
            </Typography>
            {playerName}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
