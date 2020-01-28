import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  // constructor(props) {
  // super(props);
  state = {
    course: {
      title: ""
    }
  };
  // 2. binding in constructor, the function is only boudn once
  // this.handleChange = this.handleChange.bind(this);
  // }

  // 3. Fix by using arrow function,
  // arrow funcs inherit the binding context of their enclosing scope
  // use handleChange = event => {...} instead handleChange(event) {...}
  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({
      course: course
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // we don't need to dispatch here since that's being handled in mapDispatchToProps
    this.props.actions(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Course</h2>
        <h3>Add course</h3>
        <input
          type="text"
          // 1. this isn't ideal since a new function is allocated on every render
          // onChange={this.handleChange.bind(this)}
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

// this func determines what state is passed to this component via props
// receive 2 params: state, ownProps(optional)
function mapStateToProps(state) {
  return {
    // be specific, request only the data our component needs
    // if we expose an entire Redux store, then the component will rerender when
    // any data changes in Redux store
    courses: state.courses
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
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// connect func connects components to Redux
// connect automatically passes dispatch in if we omit mapDispatchToProps here (second param)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
