import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";

import userReducer from "./reducer/userReducer";

const reducers = combineReducers({
  userReducer: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
