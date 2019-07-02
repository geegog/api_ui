import { Table } from 'reactstrap';
import React from 'react';

import axios from 'axios';
import auth from '../auth/auth'

export default class DataList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: []
        }

        this.authObj = new auth();
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/data/1/records',
            headers: this.authObj.getAuthHeader()
        })
            .then(res => {
                const datas = res.data._embedded.recordDTOList;
                console.log(datas)
                this.setState({ datas });
            })
    }

    render() {
        return (
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
                            this.state.datas.map((data, key) => <tr key={key}>
                                <td>{data.value}</td>
                                <td>{data.created}</td>
                                <td>{data.updated}</td>
                                <td></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}