import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { RootReducerState } from "../store/RootReducer";
import { connectionSlice } from "../store/ConnectionReducer";

export default function TetrisAppBar(): JSX.Element {
  const dispatch = useDispatch();
  const playerName = useSelector(
    (state: RootReducerState) => state.connection.playerName
  );
  const bestScore = useSelector(
    (state: RootReducerState) => state.connection.bestScore
  );

  const handleLogoClick = (): void => {
    dispatch(connectionSlice.actions.roomDisconnect());
  };

  return (
    <div className="Header">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <img
              className="Icon"
              src="/tetris_ico.png"
              alt="tetris_logo"
              onClick={handleLogoClick}
            />
            <Typography
              style={{ paddingLeft: "1%" }}
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Red-Tetris
            </Typography>
            <div className="PlayerBestScore">
              <p>Player Name: {playerName}</p>
              <p>Local Best: {bestScore}</p>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
