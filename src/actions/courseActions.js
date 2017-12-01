import CourseApi from '../api/mockCourseApi';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/* eslint-disable import/prefer-default-export */
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

// NOTE:  In a real-world scenario you will want to create error actions - treat the errors uniquely

// thunk
export function loadCourses() {
  return function d(dispatch) {
    dispatch(beginAjaxCall());

    return CourseApi.getAllCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// thunk
export function upsertCourse(course) {
  return function d(dispatch) {
    dispatch(beginAjaxCall());

    return CourseApi.saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
