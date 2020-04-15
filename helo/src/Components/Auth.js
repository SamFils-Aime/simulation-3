
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Register, Login } from '../ducks/reducers/userReducer';
import { Redirect } from 'react-router-dom';
import "./../styles/auth.scss"


class Auth extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRegister = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.Register(username, password);
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.Login(username, password);
  }

  render() {
    return (
      <div className="parent">
        { this.props.user.user_id ? <Redirect to="/dashboard" /> : null }
        <form className="auth">
          <div>
            Username:
            <input onChange={this.handleInput} name="username" value={this.state.username} />
          </div>

          <div>
            Password:
            <input onChange={this.handleInput} name="password" value={this.state.password} type="password" />
          </div>

          <button onClick={this.handleLogin}>Login</button>
          <button onClick={this.handleRegister}>Register</button>
        </form>
      </div>
    )
  }
}

export default connect((reduxState) => ({ user: reduxState.user }), { Register, Login })(Auth)