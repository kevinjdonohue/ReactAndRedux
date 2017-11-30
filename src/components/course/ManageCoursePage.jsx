import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

/* eslint-disable react/prefer-stateless-function */
class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      // errors: {},
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.upsertCourse = this.upsertCourse.bind(this);
  }

  updateCourseState(event) {
    const field = event.target.name;
    const { course } = this.state;
    course[field] = event.target.value;

    return this.setState({ course });
  }

  upsertCourse(event) {
    event.preventDefault();
    this.props.actions.upsertCourse(this.state.course);
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        // errors={this.state.errors}
        onSave={this.upsertCourse}
        onChange={this.updateCourseState}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// contextTypes == global variable that library authors use
// typically we should shy away from using context, but in this case
// it's here to help us avoid some boilerplate code

// another way to use the react-router
ManageCoursePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function getCourseById(courses, id) {
  const course = courses.filter(c => c.id === id);

  if (course.length) {
    return course[0];
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  // from the path '/course/:id
  const courseId = ownProps.params.id;
  console.log('courseId: ' + courseId);

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: '',
  };

  if (courseId) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => ({
    value: author.id,
    text: `${author.firstName} ${author.lastName}`,
  }));

  return {
    course,
    authors: authorsFormattedForDropdown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
