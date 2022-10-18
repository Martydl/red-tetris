import { combineReducers } from "redux";
import gameReducer from "./GameReducer";
import SocketReducer from "./SocketReducer";

const rootReducer = combineReducers({
  socket: SocketReducer,
  game: gameReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;

export default rootReducer;
