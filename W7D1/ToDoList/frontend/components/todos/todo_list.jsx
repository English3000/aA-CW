import React from 'react';
import ToDoForm from '../todo_list/todo_form';
import ListItem from './todo_list_item';

const ToDoList = props => {
  return (
    <div>
      <ToDoForm receiveTodo={props.receiveTodo}/>
      <ul>
        {props.todos.map( todo => (
          <ListItem key={todo.title}
                    todo={todo}
                    removeTodo={props.removeTodo}
                    receiveTodo={props.receiveTodo}/>
          )
        )}
      </ul>
    </div>

  );
};

export default ToDoList;
