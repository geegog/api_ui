import axios from 'axios';
import auth from '../auth/auth';
import cogoToast from 'cogo-toast';

const request = (options) => {
    const authObj = new auth();
    var headers = {
        'Content-Type': 'application/json',
    }

    if (authObj.getToken()) {
        headers = Object.assign(authObj.getAuthHeader(), headers);
    }

    axios({
        method: options.method,
        url: options.url,
        headers: headers,
        data: options.body
    }).then(res => {
        const token = res.headers.authorization;
        authObj.setToken(token);
        cogoToast.success(options.message);
        options.props.history.push(options.path);
        //console.log(this.authObj.getToken());
        // console.log(res);
        // console.log(res.data);
    }).catch((error) => {
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
    });
};

export function login(loginRequest, props) {
    return request({
        url: "http://localhost:8080/login",
        method: 'POST',
        body: JSON.stringify(loginRequest),
        message: "Login successfully!",
        path: "/profile",
        props: props
    });
}