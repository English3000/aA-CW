import { loginUser,
         // logoutUser,
         signupUser } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  // console.log(ownProps.location.pathname);
  const formType = ownProps.location.pathname ===
    '/login' ? 'login' : 'signup';
  return ({
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors,
    formType: formType
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.location.pathname ===
    '/login' ? loginUser : signupUser;
  return ({
    processForm: user => dispatch(processForm(user))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
