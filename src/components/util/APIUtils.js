import axios from 'axios';
import auth from '../auth/auth';

const request = (options) => {
    const authObj = new auth();
    var headers = {
        'Content-Type': 'application/json',
    }

    if (authObj.getToken()) {
        headers = Object.assign(authObj.getAuthHeader(), headers);
    }

    return axios({
        method: options.method,
        url: options.url,
        headers: headers,
        data: options.body
    });
};

export function login(loginRequest) {
    return request({
        url: "http://localhost:8080/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest) {
    return request({
        url: "http://localhost:8080/api/user/register",
        method: 'POST',
        body: JSON.stringify(registerRequest),
    });
}

export function encrypt(encryptionRequest, url) {
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(encryptionRequest)
    });
}

export function decrypt(decryptionRequest, url) {
    return request({
        url: url,
        method: 'POST',
        body: JSON.stringify(decryptionRequest)
    });
}