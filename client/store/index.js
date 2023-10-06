import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducerRoot from "./reducers/rootReducer";
import thunk from "redux-thunk";
// import logger from "./middlewares/logger";

const store = createStore(reducerRoot, applyMiddleware(thunk));

export default store;
