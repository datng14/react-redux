import React from "react";

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
    alert("submited");
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
      </form>
    );
  }
}

export default CoursesPage;
