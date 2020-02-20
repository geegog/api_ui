import React from 'react';
import auth from './auth'
import {withRouter} from "react-router-dom";

const authObj = new auth();

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.authObj = new auth();

    }

    handleLogout() {
        authObj.logout();
        this.props.history.push('/');
    }

    render() {
        if (this.authObj.isAuthenticated()) {
            return (
                <li>
                    <div className="btn-link" onClick={this.handleLogout.bind(this)}>Logout</div>
                </li>
            );
        } else {
            return null;
        }
    }
}

export default withRouter(Logout);