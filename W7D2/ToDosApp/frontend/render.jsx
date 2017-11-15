import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './components/todo_app';
import Connector from './components/connector';
import configureStore from "./store/store";
import { RECEIVE_TODOS, receiveTodos, RECEIVE_TODO, receiveTodo, REMOVE_TODO, removeTodo, FETCH_TODOS , fetchTodos } from './actions/todo_action';
import { RECEIVE_STEPS, receiveSteps, RECEIVE_STEP, receiveStep, REMOVE_STEP, removeStep } from './actions/step_actions';
import { receiveErrors, clearErrors } from './actions/error_actions';
import { allToDos, stepsByTodoId } from  './reducers/selectors';

document.addEventListener('DOMContentLoaded', () => {
  window.store = configureStore();
  window.receiveTodos = receiveTodos;
  window.receiveTodo = receiveTodo;
  window.receiveSteps = receiveSteps;
  window.receiveStep = receiveStep;
  window.removeStep = removeStep;
  window.allToDos = allToDos;
  window.stepsByTodoId = stepsByTodoId;
  window.fetchTodos = fetchTodos;
  window.receiveErrors = receiveErrors;
  window.clearErrors = clearErrors;
  ReactDOM.render(<Connector store = { window.store }/>, document.getElementById('content')); //OR 'root'
});
