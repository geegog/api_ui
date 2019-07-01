import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';
import cogoToast from 'cogo-toast';

export default class CryptoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValueChange = event => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const value = {
            value: this.state.value,
        };

        axios({
            method: 'post',
            url: '',
            headers: { 'Content-Type': 'application/json' },
            data: value
        })
            .then(res => {
                cogoToast.success("Login successfully!");
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => {
                if (error.response) {
                    cogoToast.error(error.response.data.message);
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    cogoToast.error("Network error!");
                    //console.log(error);
                } else {
                    cogoToast.error(error.message);
                    //console.log('Error', error.message);
                }
            })
    }

    render() {
        return (
            <div className="crypto-form">
                <Form onSubmit={this.handleSubmit}>
                    <h2 className="text-center">Encrypt and Decrypt text</h2>
                    <FormGroup>
                        <Label for="value">Value</Label>
                        <Input required type="text" name="value" id="value" placeholder="value" value={this.state.value} onChange={this.handleValueChange} />
                    </FormGroup>
                    <div className="btn-group float-right">
                        <Button color="warning" className="btn btn-lg" type="submit">Decrypt</Button>
                        <Button color="primary" className="btn btn-lg" type="submit">Encrypt</Button>
                    </div>
                </Form>
            </div>
        );
    }
}