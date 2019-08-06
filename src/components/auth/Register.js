import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

import { register } from '../util/APIUtils';

export default class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    register(user, this.props);
    
  }

  render() {
    return (
      <div className="register-form">
        <Form onSubmit={this.handleSubmit}>
          <h2 className="text-center">User Registration</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input required type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input required type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block" type="submit">Register</Button>
          <div className="pt-3"><Link className="float-right" to="/">Login</Link></div>
        </Form>
      </div>
    );
  }
}