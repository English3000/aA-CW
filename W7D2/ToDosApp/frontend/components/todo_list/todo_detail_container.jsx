import React from 'react';
import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';
import { allToDos, stepsByTodoId } from  '../../reducers/selectors';
import { RECEIVE_TODOS, receiveTodos, RECEIVE_TODO, receiveTodo, REMOVE_TODO, removeTodo} from '../../actions/todo_action';

const mapDispatchToProps = dispatch => ({
  removeTodo: (todo) => dispatch(removeTodo(todo))
});
//   receiveTodo: (todo) => dispatch(receiveTodo(todo)),

export default connect(null, mapDispatchToProps)(TodoDetailView);
