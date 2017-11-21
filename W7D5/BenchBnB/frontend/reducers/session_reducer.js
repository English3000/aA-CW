import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullUser = { currentUser: null };

export default (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      console.log(action.currentUser);
      // const currentUser = { currentUser: action.currentUser};
      return merge({}, action.currentUser);
    default:
      // debugger;
      return state;
  }
};
