import expect from 'expect';
import sinon from 'sinon';
import Course from './Course';

describe('Course', () => {
  it('should stub doSomething', () => {
    // arrange
    const stub = this.stub(Course, 'doSomething').callsFake(() => 'fakeDoSomething');

    // act
    const result = Course.doSomethingElse();

    // assert
    expect(result).toBe('fakeDoSomething');
    sinon.assert.calledOnce(stub);
  });
});
