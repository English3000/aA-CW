import {clearErrors, receiveErrors, CLEAR_ERRORS, RECEIVE_ERRORS} from '../actions/error_actions';

const initialState = [];

const errorReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch (action.type) {
    case CLEAR_ERRORS:
      return [];
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;

  }
};

export default errorReducer;
