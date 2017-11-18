import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _nullUser = { currentUser: null };

export default (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, action.currentUser);
    default:
      // debugger;
      return state;
  }
};
