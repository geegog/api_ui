import React from 'react';
import Crypto from './CryptoForm'
import auth from '../auth/auth'

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    
        this.authObj = new auth();
        console.log(this.authObj.isAthenticated());
        if (!this.authObj.isAthenticated()) {
          this.props.history.push("/");
        }
      }

    render() {
        return (
            <div className="profile">
                <Crypto />
            </div>
        )
    }
}