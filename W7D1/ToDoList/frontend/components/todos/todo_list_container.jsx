import React from 'react';
import { connect } from 'react-redux';
import ToDoList from './todo_list';
import { allToDos, stepsByTodoId } from  '../../reducers/selectors';
import { RECEIVE_TODOS, receiveTodos, RECEIVE_TODO, receiveTodo, REMOVE_TODO, removeTodo } from '../../actions/todo_action';

const mapStateToProps = (state, todoId) => ({
  todos: allToDos(state),
  steps: stepsByTodoId(state, todoId)
});

const mapDispatchToProps = dispatch => ({
  receiveTodo: (todo) => dispatch(receiveTodo(todo)),
  removeTodo: (todo) => dispatch(removeTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);
