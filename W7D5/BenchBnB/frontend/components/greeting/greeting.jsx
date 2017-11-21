import React from 'react';
import { Link } from 'react-router-dom';

export default class Greeting extends React.Component {
  // componentWillReceiveProps(nextProps) {
  //   this.render();
  // }

  render() {
    console.log(this.props);
    if (this.props.currentUser) {
      return (
        <div>
          <h3>Welcome, {this.props.currentUser.username}!</h3>
          <button onClick={this.props.logoutUser}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div>
          {/*this.props.currentUser*/}
          <Link to='/signup'>Sign Up</Link>&ensp;
          <Link to='/login'>Log In</Link>
        </div>
      );
    }
  }
}
