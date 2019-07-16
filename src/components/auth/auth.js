import jwt from 'jsonwebtoken';

export default class auth {
    setToken(token) {
        localStorage.setItem("token", token);
    }
    getAuthHeader() {
        return {'Authorization': this.getToken(), 'Content-Type': 'application/json'};
    }
    getToken() {
        return localStorage.getItem('token');
    }
    isAthenticated() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    authUser() {
        if (this.getToken() === null || this.getToken() === undefined) {
            return;
        }
        const user = jwt.decode(this.getToken().split(' ')[1]);
        return user;
    }
    isTokenExpired(token) {
        try {
            const user = this.authUser(token);
            if (user.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    logout() {
        localStorage.removeItem('token');
    }
    _checkResponseStatus(response) {
        if (response.status >= 200 && response < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}
