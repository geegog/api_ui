import axios from 'axios';
import auth from './auth';
import cogoToast from 'cogo-toast';

const request = (options) => {
    const headers = {
        'Content-Type': 'application/json',
    }

    if (auth.getToken()) {
        headers = Object.assign(auth.getAuthHeader(), headers);
    }

    axios({
        method: options.method,
        url: options.url,
        headers: headers,
        data: options.data
    })
        .then(res => {
            const token = res.headers.authorization;
            this.authObj.setToken(token);
            cogoToast.success(options.message);
            this.props.history.push(options.path);
            //console.log(this.authObj.getToken());
            // console.log(res);
            // console.log(res.data);
        })
        .catch((error) => {
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