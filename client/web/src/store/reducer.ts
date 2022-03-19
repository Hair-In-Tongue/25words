import { combineReducers } from "redux";
import playerSlice from "./reducers/playerSlice";

export default combineReducers({
  player: playerSlice,
});
