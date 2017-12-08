import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [{ title: 'A' }, { title: 'B' }];
    const newCourse = { title: 'C' };
    const action = actions.createCourseSuccess(newCourse);
    const expectedState = [...initialState];
    expectedState.push(newCourse);

    // act
    const actualState = courseReducer(initialState, action);

    // assert
    expect(actualState).toEqual(expectedState);
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: 'A', title: 'A' },
      { id: 'B', title: 'B' },
      { id: 'C', title: 'C' },
    ];
    const updatedCourse = {
      id: 'B',
      title: 'New Title',
    };
    const action = actions.updateCourseSuccess(updatedCourse);
    const expectedState = [
      { id: 'A', title: 'A' },
      { id: 'C', title: 'C' },
      { id: 'B', title: 'New Title' },
    ];

    // act
    const actualState = courseReducer(initialState, action);

    // assert
    expect(actualState).toEqual(expectedState);
  });
});
