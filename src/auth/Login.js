import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends React.Component {
    render() {
      return (
        <Form>
          <h2 className="text-center">Welcome</h2>
          <FormGroup>
            <Label for="username">Email</Label>
            <Input type="text" name="username" id="username" placeholder="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" />
          </FormGroup>
          <Button color="primary" className="btn btn-lg btn-block">Submit</Button>
          <div className="pt-3"><a className="float-right" href="/register">Register</a></div>
        </Form>
      );
    }
  }