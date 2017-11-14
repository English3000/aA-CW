import React from 'react';
import ReactDOM from 'react-dom';
import ToDoApp from './components/todo_app';
import Connector from './components/connector';
import configureStore from "./store/store";
import { RECEIVE_TODOS, receiveTodos, RECEIVE_TODO, receiveTodo, REMOVE_TODO, removeTodo } from './actions/todo_action';
import { RECEIVE_STEPS, receiveSteps, RECEIVE_STEP, receiveStep, REMOVE_STEP, removeStep } from './actions/step_actions';
import allToDos from  './reducers/selectors';

document.addEventListener('DOMContentLoaded', () => {
  window.store = configureStore;
  window.receiveTodos = receiveTodos;
  window.receiveTodo = receiveTodo;
  window.receiveSteps = receiveSteps;
  window.receiveStep = receiveStep;
  window.removeStep = removeStep;
  window.allToDos = allToDos;
  ReactDOM.render(<Connector store = { configureStore }/>, document.getElementById('app-display')); //OR 'root'
});
