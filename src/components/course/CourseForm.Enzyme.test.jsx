import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving) {
  const props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('renders a form and h1', () => {
    // arrange & act
    const wrapper = setup(false);

    // assert
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    // arrange & act
    const wrapper = setup(false);

    // assert
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving" when saving', () => {
    // arrange & act
    const wrapper = setup(true);

    // assert
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
