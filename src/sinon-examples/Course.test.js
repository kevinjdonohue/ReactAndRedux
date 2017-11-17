import expect from 'expect';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';
import Course from './Course';

const sinonTest = sinonTestFactory(sinon);

describe('Course', () => {
  it(
    'should stub doSomething',
    sinonTest(function wrapper() {
      // arrange
      const stub = this.stub(Course, 'doSomething').callsFake(() => 'fakeDoSomething');

      // act
      const result = Course.doSomethingElse();

      // assert
      expect(result).toBe('fakeDoSomething');
      sinon.assert.calledOnce(stub);
    }),
  );
});
