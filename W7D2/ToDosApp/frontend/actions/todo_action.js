import { APIfetchTodos, APIcreateTodo } from '../util/todo_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';
export const CREATE_TODO = 'CREATE_TODO';

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
});

export const fetchTodos = () => (
  (dispatch) => {
    APIfetchTodos().then(
      todos => dispatch(receiveTodos(todos)),
      error => console.log(error)
    );
  }
);

export const createTodo = (todo) => (
  (dispatch) => {
    return APIcreateTodo(todo).then(
      newTodo => dispatch(receiveTodo(newTodo)),
      err => dispatch(receiveErrors(err.responseJSON))
    );
  }
);
