import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [{ title: 'A' }, { title: 'B' }];
    const newCourse = { title: 'C' };
    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
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

    // act
    const newState = courseReducer(initialState, action);

    // assert
    const updatedCourseB = newState.find(x => x.id === updatedCourse.id);
    const untouchedCourseA = newState.find(x => x.id === 'A');
    const untouchedCourseC = newState.find(x => x.id === 'C');

    expect(updatedCourseB.title).toEqual('New Title');
    expect(untouchedCourseA.title).toEqual('A');
    expect(untouchedCourseC.title).toEqual('C');
    expect(newState.length).toEqual(3);
  });
});
