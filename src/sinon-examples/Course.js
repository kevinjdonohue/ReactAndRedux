class Course {
  static doSomething() {
    return 'doSomething';
  }

  static doSomethingElse() {
    return Course.doSomething();
  }
}

export default Course;
