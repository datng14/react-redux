import * as authorApi from "../../api/authorApi";
import * as actionTypes from "../actions/actionTypes";
import { beginApiCall } from "./apiStatusActions";

export function loadAuthorSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch(error => {
        throw error;
      });
  };
}
