import expect from 'expect';
import thunk from 'redux-thunk';
// import nock from 'nock';
import configureMockStore from 'redux-mock-store';
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

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  // afterEach(() => {
  //   nock.cleanAll();
  // });

  it('should create BEGIN_AJAX_CALL & LOAD_COURSES_SUCCESS when loading courses', (done) => {
    // example of how to setup nock (node mock)
    // since we don't have real API calls in our project this is commented out; not needed
    // nock('http://example.com')
    //   .get('/courses')
    //   .reply(200, { body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House' }] } });

    // arrange
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      {
        type: types.LOAD_COURSES_SUCCESS,
        body: { courses: [{ id: 'clean-code', title: 'Clean Code' }] },
      },
    ];

    const store = mockStore({ courses: [] }, expectedActions);

    // act
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actualActions = store.getActions();

      // assert
      expect(actualActions.length).toEqual(2);
      expect(actualActions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actualActions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);

      // cleanup
      done();
    });
  });
});
