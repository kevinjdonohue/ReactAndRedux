import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

describe('CourseActions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      // arrange
      const course = {
        id: 'clean-code',
        title: 'Clean Code',
      };

      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course,
      };

      // act
      const actualAction = courseActions.createCourseSuccess(course);

      // assert
      expect(actualAction).toEqual(expectedAction);
    });
  });
});
