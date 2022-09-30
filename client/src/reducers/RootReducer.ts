import { combineReducers } from "redux";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
  game: gameReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;

export default rootReducer;
