import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  static courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: '' },
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const { course } = this.state;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(CoursesPage.courseRow)}
        <h2>Add Course</h2>
        <input type="text" value={this.state.course.title} onChange={this.onTitleChange} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

export default connect(mapStateToProps)(CoursesPage);
