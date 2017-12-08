import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/authorSelectors';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      saving: false,
      errors: {},
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.upsertCourse = this.upsertCourse.bind(this);
  }

  // react lifecycle function
  // runs when props have changed (and even sometimes when they haven't)
  componentWillReceiveProps(nextProps) {
    const courseIdChanged = this.props.course.id !== nextProps.course.id;

    if (courseIdChanged) {
      // necessary to populate form when existing course is loaded directly (hit the URL directly)
      this.setState({
        course: Object.assign({}, nextProps.course),
      });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    const { course } = this.state;
    course[field] = event.target.value;

    return this.setState({ course });
  }

  redirect() {
    this.setState({ saving: false });

    toastr.success('Course saved', 'PluralSight Admin', { timeOut: 3000 });
    this.context.router.push('/courses');
  }

  courseFormIsValid() {
    let formIsValid = true;
    const errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({ errors });

    return formIsValid;
  }

  upsertCourse(event) {
    event.preventDefault();

    if (this.courseFormIsValid() === false) {
      return;
    }

    this.setState({ saving: true });

    this.props.actions
      .upsertCourse(this.state.course)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error, 'PluralSight Admin', { timeOut: 3000 });
        this.setState({ saving: false });
      });
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        onSave={this.upsertCourse}
        onChange={this.updateCourseState}
        saving={this.state.saving}
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
  const courseWasFound = course.length;

  if (courseWasFound) {
    return course[0];
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  // from the path '/course/:id
  const courseId = ownProps.params.id;

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: '',
  };

  const stateContainsCourses = state.courses.length > 0;

  if (courseId && stateContainsCourses) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// NOTE:  Instead of disabling the eslint rule - import/no-named-as-default rule
// we've exported the non-wrapped component that we're using just for testing
// as a "testable"
export { ManageCoursePage as TestableManageCoursePage };
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
