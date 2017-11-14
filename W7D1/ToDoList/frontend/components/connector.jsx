import React from 'react';
import { Provider } from 'react-redux';
import ToDoApp from './todo_app';

const Connector = ({ store }) => (
  <Provider store={store}>
    <ToDoApp />
  </Provider>
);

export default Connector;
