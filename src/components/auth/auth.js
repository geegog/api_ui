import jwt from 'jsonwebtoken';

export default class auth {
    setToken(token) {
        localStorage.setItem("token", token);
    }
    getAuthHeader() {
        return {'Authorization': this.getToken()};
    }
    getToken() {
        return localStorage.getItem('token');
    }
    isAthenticated() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    authUser(token) {
        const user = jwt.decode(token.split(' ')[1]);
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
}
