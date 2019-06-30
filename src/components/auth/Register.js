import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class RegisterForm extends React.Component {
  render() {
    return (
      <div className="register-form">
        <Form>
          <h2 className="text-center">User Registration</h2>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" placeholder="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block">Register</Button>
          <div className="pt-3"><a className="float-right" href="/">Login</a></div>
        </Form>
      </div>
    );
  }
}