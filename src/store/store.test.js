import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean Code',
    };
    const expectedCourse = {
      title: 'Clean Code',
    };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);
    const actualCourses = store.getState().courses;
    const actualCourse = actualCourses[0];

    // assert
    expect(actualCourses.length).toEqual(1);
    expect(actualCourse).toEqual(expectedCourse);
  });
});
