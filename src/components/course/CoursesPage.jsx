import React from 'react';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: '' },
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const { course } = this.state;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSave() {
    alert(`Saving ${this.state.course.title}`);
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <input type="text" value={this.state.course.title} onChange={this.onTitleChange} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}

export default CoursesPage;
