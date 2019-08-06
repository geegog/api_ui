import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

import axios from 'axios';
import cogoToast from 'cogo-toast';
import auth from './auth';
import { login } from '../util/APIUtils';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.authObj = new auth();
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.authObj.isAthenticated());
    if (this.authObj.isAthenticated()) {
      this.props.history.push("/profile");
    }
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    login(user, this.props);

  }

  render() {
    return (
      <div className="login-form">
        <Form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Welcome</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input required type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input required type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block" type="submit">Log In</Button>
          <div className="pt-3"><Link className="float-right" to="/register">Register</Link></div>
        </Form>
      </div>
    );
  }
}