import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

// 5 Parts of a Container Component in React & Redux -- see below

class CoursesPage extends React.Component {
  // (1) Constructor:  initialize state, bind functions
  /* eslint-disable react/sort-comp */
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: '' },
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  // (2) Child Functions:
  onTitleChange(event) {
    const { course } = this.state;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSave() {
    this.props.actions.createCourse(this.state.course);
  }

  static courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // (3) Render Method:
  // NOTE:  This markup should be moved into a separate, presentation component; for demo purposes
  render() {
    // debugger;
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

// (4) PropTypes:  PropType validation
/* eslint-disable react/forbid-prop-types */
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// (5) Redux Related Functions:
// connect, bindActionCreators, mapStateToProps, mapDispatchToProps, etc.
function mapStateToProps(state) {
  // debugger;
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
