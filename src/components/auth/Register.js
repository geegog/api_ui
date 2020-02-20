import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link} from "react-router-dom";

import {register} from '../util/APIUtils';
import cogoToast from 'cogo-toast';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        register(user, this.props).then(res => {
            cogoToast.success("Account successfully created, Please Login!");
            this.props.history.push("/");
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
            <div className="register-form">
                <Form onSubmit={this.handleSubmit}>
                    <h2 className="text-center">User Registration</h2>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input required type="text" name="username" id="username" placeholder="username"
                               value={this.state.username} onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input required type="password" name="password" id="password" placeholder="password"
                               value={this.state.password} onChange={this.handleInputChange}/>
                    </FormGroup>
                    <Button color="primary" className="btn btn-lg btn-block" type="submit">Register</Button>
                    <div className="pt-3"><Link className="float-right" to="/">Login</Link></div>
                </Form>
            </div>
        );
    }
}