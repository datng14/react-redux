import * as actionTypes from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function createCoursesSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

// use middleware (thunk)
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  // getState is optional, it allow us to access the Redux store data
  return function(dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCoursesSuccess(savedCourse))
          : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
