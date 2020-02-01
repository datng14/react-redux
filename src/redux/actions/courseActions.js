import * as actionTypes from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function createCoursesSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course };
}

// use middleware (thunk)
export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function saveCourse(course) {
  // getState is optional, it allow us to access the Redux store data
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCoursesSuccess(savedCourse))
          : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
