import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-form">
        <Form>
          <h2 className="text-center">Welcome</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block">Log In</Button>
          <div className="pt-3"><a className="float-right" href="/register">Register</a></div>
        </Form>
      </div>
    );
  }
}