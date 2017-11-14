import * as types from './actionTypes';

/* eslint-disable import/prefer-default-export */
export function createCourse(course) {
  // debugger;
  return { type: types.CREATE_COURSE, course };
}
