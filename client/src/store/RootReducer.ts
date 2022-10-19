import { combineReducers } from "redux";
import gameReducer from "./GameReducer";
import ConnectionReducer from "./ConnectionReducer";

const rootReducer = combineReducers({
  socket: ConnectionReducer,
  game: gameReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;

export default rootReducer;
