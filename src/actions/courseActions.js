import CourseApi from '../api/mockCourseApi';
import * as types from './actionTypes';

/* eslint-disable import/prefer-default-export */
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

// NOTE:  In a real-world scenario you will want to create error actions - treat the errors uniquely

// thunk
export function loadCourses() {
  return dispatch =>
    CourseApi.getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw (error);
      });
}
