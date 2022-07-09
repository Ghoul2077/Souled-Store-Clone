import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import persistConfig from "./config/persistConfig";
import firstRunReducer from "./reducers/firstRun";
import themeReducer from "./reducers/theme";
import authReducer from "./reducers/auth";

const combinedReducer = combineReducers({
  firstRun: firstRunReducer,
  theme: themeReducer,
  user: authReducer,
});

export default persistReducer(persistConfig, combinedReducer);
