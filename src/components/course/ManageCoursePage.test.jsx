import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { TestableManageCoursePage } from './ManageCoursePage';

describe('ManageCoursePage', () => {
  it('sets an error message when trying to save an empty title', () => {
    // arrange & act
    const props = {
      authors: [],
      course: {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: '',
      },
      actions: {
        upsertCourse: () => Promise.resolve(),
      },
    };

    // Option 1 for testing:
    // const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>);

    // Option 2 for testing:
    const wrapper = mount(<TestableManageCoursePage {...props} />);

    // assert
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');

    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
