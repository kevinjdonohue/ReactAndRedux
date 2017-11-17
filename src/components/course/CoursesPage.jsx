import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

// 5 Parts of a Container Component in React & Redux -- see below

class CoursesPage extends React.Component {
  // (1) Constructor:  initialize state, bind functions

  // (2) Child Functions:
  static courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // (3) Render Method:
  render() {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

// (4) PropTypes:  PropType validation
/* eslint-disable react/forbid-prop-types */
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
};

// (5) Redux Related Functions:
// connect, bindActionCreators, mapStateToProps, mapDispatchToProps, etc.
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
