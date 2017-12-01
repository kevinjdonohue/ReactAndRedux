import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

/* eslint-disable arrow-body-style */
const CourseList = ({ courses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseListRow key={course.id} course={course} />
        ))}
      </tbody>
    </table>
  );
};

/* eslint-disable react/forbid-prop-types */
CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;
