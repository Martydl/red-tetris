import { combineReducers } from "redux";
import connectionReducer from "./ConnectionReducer";
import roomReducer from "./RoomReducer";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
  connection: connectionReducer,
  room: roomReducer,
  game: gameReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;

export default rootReducer;
