// import React, { PropTypes } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';

/* eslint-disable react/prefer-stateless-function */
class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return <h1>Manage Course</h1>;
  }
}

ManageCoursePage.propTypes = {
  // someProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
