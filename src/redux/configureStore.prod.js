import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export function configureStore(initialState) {
  // add support Redux for devtools
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
