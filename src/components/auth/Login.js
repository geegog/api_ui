import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

import auth from './auth';
import { login } from '../util/APIUtils';

import cogoToast from 'cogo-toast';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.authObj = new auth();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.authObj.isAthenticated());
    if (this.authObj.isAthenticated()) {
      this.props.history.push("/profile");
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    login(user).then(res => {
      const token = res.headers.authorization;
      this.authObj.setToken(token);
      cogoToast.success("Login successfully!");
      this.props.history.push("/profile");
    }).catch((error) => {
      if (error.response) {
        cogoToast.error(error.response.data.message);
      } else if (error.request) {
        cogoToast.error("Network error!");
      } else {
        cogoToast.error(error.message);
      }
    });

  }

  render() {
    return (
      <div className="login-form">
        <Form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Welcome</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input required type="text" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input required type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block" type="submit">Log In</Button>
          <div className="pt-3"><Link className="float-right" to="/register">Register</Link></div>
        </Form>
      </div>
    );
  }
}