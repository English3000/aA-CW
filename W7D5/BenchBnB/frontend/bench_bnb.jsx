import React from 'react';
import ReactDOM from 'react-dom';
import { signupUser, loginUser, logoutUser } from './actions/session_actions';
import { fetchBenches, createBench } from './actions/bench_actions';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {session: {currentUser: window.currentUser}};
  }
  const store = configureStore(preloadedState);
  // window.signupUser = signupUser;
  // window.loginUser = loginUser;
  // window.logoutUser = logoutUser;

  window.fetchBenches = fetchBenches;
  window.createBench = createBench;
  window.store = store;
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});
