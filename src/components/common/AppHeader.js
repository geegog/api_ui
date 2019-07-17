import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import auth from '../auth/auth';

class AppHeader extends Component {

    constructor(props) {
        super(props);

        this.authObj = new auth();
    }

    render() {
        return (
            <div>
                {this.authObj.isAthenticated() ?
                    (<ul>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <Logout />
                    </ul>) :
                    (<ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>)
                }

                <hr />
            </div>
        )
    }
}

export default AppHeader;