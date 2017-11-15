import React from 'react';
import ToDoForm from '../todo_list/todo_form';
import ListItem from './todo_list_item';

class ToDoList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render(){
    return(<div>
      <ToDoForm createTodo={this.props.createTodo} errors={this.props.errors}/>
      <ul>
        {this.props.todos.map( todo => (
          <ListItem key={todo.title}
                    todo={todo}
                    removeTodo={this.props.removeTodo}
                    receiveTodo={this.props.receiveTodo}/>
          )
        )}
      </ul>
    </div>);
  }

  componentDidMount(){
    this.props.fetchTodos();
  }

}

export default ToDoList;
