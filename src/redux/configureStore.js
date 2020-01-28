import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export function configureStore(initialState) {
  // add support Redux for devtools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, immutableStateInvariantMiddleware())
    )
  );
}
