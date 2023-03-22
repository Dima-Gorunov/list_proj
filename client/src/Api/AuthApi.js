import {authInstance, instance} from "./AuthInstance"
import jwtDecode from "jwt-decode";

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