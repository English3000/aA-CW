import React from 'react';
import { connect } from 'react-redux';
import ToDoList from './todo_list';
import { allToDos, stepsByTodoId } from  '../../reducers/selectors';
import { RECEIVE_TODOS, receiveTodos, REMOVE_TODO, removeTodo, receiveTodo, fetchTodos, createTodo } from '../../actions/todo_action';
import { receiveErrors } from '../../actions/error_actions';

const mapStateToProps = (state, todoId) => ({
  todos: allToDos(state),
  steps: stepsByTodoId(state, todoId),
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(fetchTodos()),
  receiveTodo: (todo) => dispatch(receiveTodo(todo)),
  createTodo: (todo) => dispatch(createTodo(todo)),
  removeTodo: (todo) => dispatch(removeTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);
