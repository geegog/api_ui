import React from "react";
import { Route, withRouter } from "react-router-dom";

import LoginForm from './components/auth/Login';
import RegisterForm from './components/auth/Register';
import Profile from "./components/information/Profile";
import PrivateRoute from "./components/common/PrivateRoute";
import auth from './components/auth/auth';
import AppHeader from './components/common/AppHeader';

class Routes extends React.Component {

    constructor(props) {
        super(props);

        this.authObj = new auth();
    }

    render() {
        return (
            <div>
                <Route component={AppHeader} />
                <Route exact path="/" component={LoginForm} />
                <Route exact path="/register" component={RegisterForm} />
                <PrivateRoute exact path="/profile" authenticated={this.authObj.isAthenticated()} component={Profile} />
            </div>
        );
    }
}

export default withRouter(Routes);