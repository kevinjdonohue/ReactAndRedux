import CourseApi from '../api/mockCourseApi';
import * as types from './actionTypes';

/* eslint-disable import/prefer-default-export */
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
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
        throw error;
      });
}

export function upsertCourse(course) {
  return dispatch =>
    CourseApi.saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
}
