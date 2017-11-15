import React from 'react';
import ToDoListContainer from './todos/todo_list_container';

class ToDoApp extends React.Component{
  render() {
    return(
      <div>
        To-Do App!
        <ToDoListContainer />
      </div>
    );
  }
}

export default ToDoApp;
