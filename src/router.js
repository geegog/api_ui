import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import LoginForm from './components/auth/Login'
import RegisterForm from './components/auth/Register'
import Profile from "./components/information/Profile";
import Logout from './components/auth/Logout'

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <Logout />
                    </ul>

                    <hr />

                    <Route exact path="/" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/profile" component={Profile} />
                </div>
            </Router>
        );
    }
}

export default withRouter(Routes);