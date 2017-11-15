import React from 'react';
import TodoDetailView from '../todo_list/todo_detail_view';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {detail: false};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  render() {
    return (
      <li>
        <a onClick={this.changeDisplay}>{this.props.todo.title}&ensp;</a>
        <button onClick={this.handleStatus}>{this.props.todo.done === false ? "Done" : "Undo"}</button>
        <button onClick={this.handleDelete}>Delete</button>
        <TodoDetailView todo={this.props.todo} detail={this.state.detail} />
      </li>
    );
  }

  handleDelete(event) {
    event.preventDefault();
    this.props.removeTodo(this.props.todo);
  }

  handleStatus(event) {
    event.preventDefault();
    this.updateTodo();
    this.props.receiveTodo(this.props.todo);
  }

  updateTodo() {
    this.props.todo.done = !this.props.todo.done;
  }

  changeDisplay(event) {
    event.preventDefault();
    this.setState({detail: !this.state.detail});
  }
}

export default ListItem;
