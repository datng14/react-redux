import * as actionTypes from "../actions/actionTypes";
import initalState from "./initalState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

// an action can be handled by multiple reducer
// ex: loadCourses will be handled by courseReducer and apiStatusReducer
export default function apiCallStatusReducer(
  state = initalState.apiCallsInProgress,
  action
) {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
