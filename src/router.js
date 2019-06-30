import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginForm from './components/auth/Login'
import RegisterForm from './components/auth/Register'

function Routes() {
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
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
          </ul>
  
          <hr />
  
          <Route exact path="/" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          {/* <Route path="/profile" component={Topics} /> */}
        </div>
      </Router>
    );
  }

  export default Routes;