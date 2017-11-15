import { receiveTodos } from '../actions/todo_action.js';

export const APIfetchTodos = () => (
  $.ajax({
    method: 'GET',
    url: '/api/todos'
  })
);

export const APIcreateTodo = (todo) => (
  $.ajax({
    method: 'POST',
    url: '/api/todos',
    data: { todo }
  })
);
