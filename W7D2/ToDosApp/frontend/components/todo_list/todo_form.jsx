import React from 'react';
import uniqueId from '../../util/utils';

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", title: "", body: "", done: false };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="todo-form">
        <h2>Add New Task!</h2>
        <form onSubmit={this.handleSubmit}>
          <p>{this.props.errors}</p>
          <input
            type="text"
            onChange={this.updateTitle}
            value={this.state.title}
            placeholder="Task"
          />
          <input
            type="text"
            onChange={this.updateBody}
            value={this.state.body}
            placeholder="Details"
          />
        <button>Just Do It.</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.id = uniqueId();
    console.log(this.props);
    console.log(this.state);
    // console.log(this.props.createTodo(this.state));
    // debugger
    this.props.createTodo(this.state).then( //then's receiver === undefined
      () => this.setState({title: '', body: ''})
    );
    // this.setState({ id: "", title: "", body: "", done: false });
  }

  updateTitle(event) {
    this.setState({ title: event.target.value });
  }

  updateBody(event) {
    this.setState({ body: event.target.value });
  }
}

export default ToDoForm;
