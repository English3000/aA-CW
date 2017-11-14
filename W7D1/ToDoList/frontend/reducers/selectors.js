export const allToDos = (state) => {
  const keys = Object.keys(state.todos);
  return keys.map( key => state.todos[key]);
};

export const stepsByTodoId = (state, todoId) => {
  return state.steps.filter(step => step.todoId === todoId); //.filter can't be called on obj.
};
