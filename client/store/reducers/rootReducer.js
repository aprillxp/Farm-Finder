import { combineReducers } from "redux";
import farmReducer from "./farmReducer";
import userReducer from "./userReducer";
import investReducer from "./investReducer";
import balanceReducer from "./balanceReducer";

const rootReducer = combineReducers({
  farms: farmReducer,
  user: userReducer,
  invest: investReducer,
  balance: balanceReducer,
  // categories: categoriesReducer,
  // images: imagesReducer,
});

export default rootReducer;
