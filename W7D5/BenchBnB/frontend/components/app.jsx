import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session/session_form_container';
import SearchContainer from './benches/search_container';
import { Route } from 'react-router-dom';
import AuthRoute from '../util/route_util';

export default () => (
  <div>
    <header>
      <h1>Bench BnB</h1>
      <GreetingContainer /> {/*why doesn't this auto-refresh upon login?*/}
    </header>
    <br/>
    {/*if (!window.currentUser) { */}
    <AuthRoute path='/login' component={SessionFormContainer} />
    <AuthRoute path='/signup' component={SessionFormContainer} />
    {/* };*/}
    <Route exact path='/' component={SearchContainer} />
  </div>
);
