import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert("Loading courses Failed" + error));
    }
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert("Loading authors Failed" + error));
    }
  }

  handleDeleteCourse = async course => {
    try {
      await this.props.actions.deleteCourse(course);
      toast.success("Course deleted!");
    } catch (error) {
      toast.error("Delete failed. " + error.message);
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDelete={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

// this func determines what state is passed to this component via props
// receive 2 params: state, ownProps(optional)
function mapStateToProps(state) {
  return {
    // be specific, request only the data our component needs
    // if we expose an entire Redux store, then the component will rerender when
    // any data changes in Redux store
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id == course.authorId
              ).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

// mapDispatchToProps (optional): this lets us declare what actions to pass to our component on props
// since we declared mapDispatchToProps, dispatch is no longer injected.
// only the actions we declared in mapDispatchToProps are passed in.
function mapDispatchToProps(dispatch) {
  return {
    // remember to dispatch action here
    // if we just call action, it wont do anything
    // because it only a func return an object
    // first way:
    // createCourse: course => dispatch(courseActions.createCourse(course))
    // second way :
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

// connect func connects components to Redux
// connect automatically passes dispatch in if we omit mapDispatchToProps here (second param)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
