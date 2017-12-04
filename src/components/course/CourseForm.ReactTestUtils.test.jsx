import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  const props = {
    course: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(<CourseForm {...props} />);

  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
  };
}

describe('CourseForm via React Test Utils', () => {
  it('renders a form and h1', () => {
    // arrange & act
    const { output } = setup(false);

    // assert
    expect(output.type).toBe('form');
    const [h1] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', () => {
    // arrange & act
    const { output } = setup(false);
    const submitButton = output.props.children[5];

    // assert
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    // arrange & act
    const { output } = setup(true);
    const submitButton = output.props.children[5];

    // assert
    expect(submitButton.props.value).toBe('Saving...');
  });
});
