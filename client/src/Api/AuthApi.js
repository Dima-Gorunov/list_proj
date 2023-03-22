import axios from "axios";
import jwtDecode from "jwt-decode";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/"
})

const authInstance = axios.create({                     // далее прикрепляет в хедер auth токен
    withCredentials: true,   // отправлять с куками
    baseURL: "http://localhost:5000/"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.authorization);
    return config
}
authInstance.interceptors.request.use(authInterceptor)  // связывает authInstance и authInterceptor


export const AuthApi = {
    registration(email, password) {
        return authInstance.post('api/user/registration', {email, password})
    },

    login(email, password) {
        return authInstance.post('api/user/login', {email, password})
    },

    logout() {
        return authInstance.post('api/user/logout')
    },

    checkAuth() {
        return instance.get('api/user/refresh')
    },

    getInfo() {
        return authInstance.get('api/user/info')
    },

    setAvatar(formData) {
        return authInstance.put('api/user/setavatar', formData)
    }
}