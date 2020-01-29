import React, { useEffect, useState } from "react";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

function ManageCoursePage({
  authors,
  courses,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert("Load Courses failed" + error));
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => alert("Load author failed" + error));
    }
  }, [props.course]);

  function handleChange(event) {
    // Without this deconstructing, we will get an error
    // this synthetic event is reused for performance reason.
    // b/c this synthetic event is no longer defined within async func
    // this line allow us to retain a local referrence to the event.
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return course.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// ownProps: let us access our component's props
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

// If we declare mapDispatchToProps as an object instead, each property will
// automatically be bound to dispatch
// function mapDispatchToProps(dispatch) {
//   return {
//     loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//     loadAuthos: bindActionCreators(authorActions.loadAuthors, dispatch)
//   };
// }

const mapDispatchToProps = {
  loadAuthors: loadAuthors,
  loadCourses: loadCourses,
  saveCourse: saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
