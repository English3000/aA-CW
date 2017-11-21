import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'password': ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.history.push('/'));
    // this.setState({'username': '', 'password': ''});
  }

  update(field) {
    return event => {
      this.setState({ [field]: event.target.value });
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.errors.session}
        <form onSubmit={this.handleSubmit}>
          <input type='text'
                 onChange={this.update('username')}
                 value={this.state.username}
                 placeholder='username'/>
          <input type='password'
                 onChange={this.update('password')}
                 value={this.state.password}
                 placeholder='password'/>
          <input type='submit'
                 value={this.props.formType === 'login' ? 'Log In' : 'Sign Up'}/>
        </form>
      </div>
    );
  }
}
