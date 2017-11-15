export const allToDos = (state) => {
  const keys = Object.keys(state.todos);
  return keys.map( key => state.todos[key]);
};

export const stepsByTodoId = (state, todoId) => {
  let stepsToRender = [];
  for (const id in state.steps) {
    // console.log("Id: " + id);
    // console.log(state.steps);
    // console.log(state.steps[id]);
    // console.log("Object todoId: " + state.steps[id].todoId);
    // console.log("Fuction todoId: " + todoId);
    if (state.steps[id].todoId === todoId) {
      stepsToRender.push(state.steps.id);
      // console.log(stepsToRender);
    }
  }
  return stepsToRender;
};
