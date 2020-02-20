import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';

import cogoToast from 'cogo-toast';
import auth from '../auth/auth'

import {decrypt, encrypt} from '../util/APIUtils';

export default class CryptoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            editeMode: false,
            links: {}
        }

        this.authObj = new auth();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidUpdate(prevProps) {

        const {action} = prevProps;
        //console.log(action, this.props.action.value);
        const cValue = this.props.action.value;
        const links = this.props.action.links;
        if (action.value !== cValue) {
            this.setState({value: cValue});
            this.setState({links: links})
            this.setState({editeMode: true})
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

        let url = '';

        const value = {
            value: this.state.value
        };

        if (this.state.editeMode) {
            url = this.state.links.encrypt_update.href;
        } else {
            url = 'http://localhost:8080/api/data/encrypt';
        }

        encrypt(value, url)
            .then(res => {
                cogoToast.success("Data encrypted successfully!");

                this.props.handleStateChange(res.data);
                if (!this.state.editeMode) {
                    this.setState({value: ''});
                }
            })
            .catch((error) => {
                if (error.response) {
                    cogoToast.error(error.response.data.message);
                } else if (error.request) {
                    cogoToast.error("Network error!");
                } else {
                    cogoToast.error(error.message);
                }
            })
    }

    handleDecrypt = event => {
        event.preventDefault();

        const value = {
            value: this.state.value
        };

        decrypt(value, this.state.links.decrypt.href)
            .then(res => {
                cogoToast.success("Data decrypted successfully!");

                cogoToast.info(res.data.value, {
                    onClick: hide => {
                        hide();
                    },
                    hideAfter: 30,
                    heading: 'Here is the real content :)',
                    bar: {size: '4px', style: 'dotted'},
                });

            })
            .catch((error) => {
                if (error.response) {
                    cogoToast.error(error.response.data.message);
                } else if (error.request) {
                    cogoToast.error("Network error!");
                } else {
                    cogoToast.error(error.message);
                }
            })
    }

    render() {
        console.log(this.state.editeMode);
        return (
            <div className="crypto-form">
                <Form onSubmit={this.handleSubmit}>
                    <h2 className="text-center">Encrypt and Decrypt text</h2>
                    <FormGroup>
                        <Label for="value">Value</Label>
                        <Input required type="text" name="value" id="value" placeholder="value" value={this.state.value}
                               onChange={this.handleInputChange}/>
                    </FormGroup>
                    <div className="btn-group float-right">
                        {this.state.editeMode === false ? null : <Button color="warning" className="btn btn-lg"
                                                                         onClick={this.handleDecrypt}>Decrypt</Button>}
                        <Button color="primary" className="btn btn-lg" type="submit">Encrypt</Button>
                    </div>
                </Form>
            </div>
        );
    }
}