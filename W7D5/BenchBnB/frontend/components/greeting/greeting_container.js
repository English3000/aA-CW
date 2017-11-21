import { loginUser,
         logoutUser,
         signupUser } from '../../actions/session_actions';
import { connect } from 'react-redux';
import Greeting from './greeting';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  // loginUser: user => dispatch(loginUser(user)),
  logoutUser: () => dispatch(logoutUser()),
  // signupUser: user => dispatch(signupUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
