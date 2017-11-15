import { RECEIVE_STEPS, receiveSteps, RECEIVE_STEP, receiveStep, REMOVE_STEP, removeStep } from '../actions/step_actions';
import merge from 'lodash/merge';

const initialState = {

  1: {
    id: 1,
    title: 'buy new sponge',
    todoId: 1,
    done: false
  },
  2: {
    id: 2,
    title: 'buy shampoo',
    todoId: 2,
    done: true
  },
  3: {
    title: 'wash dog',
    todoId: 2,
    done: true
  }
};

const stepsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case RECEIVE_STEPS:
      action.steps.forEach(step => {
        newState[step.id] = step;
      });
      return newState;
    case RECEIVE_STEP:
      newState[action.step.id] = action.step;
      return merge(newState, state);
    case REMOVE_STEP:
      newState = merge({}, state);
      delete newState[action.step.id];
      return newState;
    default:
      return state;
  }
};

export default stepsReducer;
