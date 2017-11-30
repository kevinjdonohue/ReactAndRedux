import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    case types.CREATE_COURSE_SUCCESS:
      // returns all current courses plus new course in an array
      // using spread operator and Object.assign in order to treat state as immutable (Redux)
      return [...state, Object.assign({}, action.course)];

    case types.UPDATE_COURSE_SUCCESS:
      // returns all currents courses except one we're updating plus new (updated) course
      // using the spread operator and Object.assign in order to treat state as immutable (Redux)
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course),
      ];

    default:
      return state;
  }
}
