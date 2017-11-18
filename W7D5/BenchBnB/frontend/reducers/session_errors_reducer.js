import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) { //{type: "@@redux/INIT"}
    case RECEIVE_ERRORS:
    // debugger;
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};
