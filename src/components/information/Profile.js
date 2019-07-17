import { Table, Button } from 'reactstrap';
import React from 'react';
import Crypto from './CryptoForm'
import auth from '../auth/auth'
import axios from 'axios';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            action: {
                value: '',
                links: {}
            }
        }

        this.authObj = new auth();

        this.handleStateChange = this.handleStateChange.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    handleStateChange(value) {
        const index = this.state.datas.findIndex((record) => { return record._id === value._id });

        console.log('index: ', index);

        if (index >= 0) {
            const newDatas = Object.assign([], this.state.datas);
            newDatas[index] = value;
            this.setState({ datas: newDatas });
        } else {
            this.setState(prevState => ({
                datas: [...prevState.datas, value]
            }))
        }

    }

    setValue(value, links) {
        this.setState({ action: { value, links } })
    }

    componentDidMount() {
        if (this.authObj.authUser() !== null && this.authObj.authUser() !== undefined) {
            axios({
                method: 'get',
                url: 'http://localhost:8080/api/data/' + this.authObj.authUser().sub + '/records',
                headers: this.authObj.getAuthHeader()
            })
                .then(res => {
                    console.log(res.data)
                    const datas = res.data._embedded !== undefined ? res.data._embedded.recordDTOList : [];
                    this.setState({ datas: datas });
                })
        }
    }

    render() {
        return (
            <div className="profile">
                <Crypto handleStateChange={this.handleStateChange} action={this.state.action} />
                <div className="table-responsive">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.datas.map((data) => <tr key={data._id}>
                                    <td className="d-inline-block text-truncate wrap-width">{data.value}</td>
                                    <td>{data.created}</td>
                                    <td>{data.updated}</td>
                                    <td><Button onClick={() => this.setValue(data.value, data._links)}>Select</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}