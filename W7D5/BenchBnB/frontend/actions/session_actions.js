import { login,
         logout,
         signup } from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
export const receiveErrors = errors => ({
  type: RECEIVE_CURRENT_USER,
  errors
});

export const loginUser = user => dispatch => {
  return login(user).then(currentUser => dispatch(receiveCurrentUser(currentUser)));
};
export const logoutUser = () => dispatch => {
  return logout().then( () => dispatch(receiveCurrentUser(null)) );
};
export const signupUser = user => dispatch => {
  return signup(user).then(currentUser => dispatch(receiveCurrentUser(currentUser)));
};

// export const loginUser = user => async (dispatch) => {
//   return dispatch(receiveCurrentUser(await login(user)));
// };
