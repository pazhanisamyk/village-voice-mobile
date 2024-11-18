import { combineReducers } from "redux";
import auth from "./auth";
import Types from "../types";

const appReducer = combineReducers({
    auth
  });
  
  const rootReducer = (state, action) => {
    if (action.type == Types.USER_LOGOUT) {
      state = undefined;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;