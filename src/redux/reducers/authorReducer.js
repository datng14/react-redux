import * as actionTypes from "../actions/actionTypes";
import initalState from "./initalState";

export default function authorReducer(state = initalState.authors, action) {
  switch (action.type) {
    case actionTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
