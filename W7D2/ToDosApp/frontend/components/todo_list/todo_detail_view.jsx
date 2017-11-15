import React from 'react';

const TodoDetailView = ({todo, detail}) => {
  if (detail) {
    return (
      <div>
        {todo.body}
      </div>
    );
  } else {
    return null;
  }
};

export default TodoDetailView;
