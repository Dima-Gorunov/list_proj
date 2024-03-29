import {authInstance, instance} from "./AuthInstance"

export const AuthApi = {
    registration(email, password) {
        return authInstance.post('/api/user/registration', {email, password})
    },

    login(email, password) {
        return authInstance.post('/api/user/login', {email, password})
    },

    logout() {
        return authInstance.post('/api/user/logout')
    },

    checkAuth() {
        return instance.get('/api/user/refresh')
    },

    getMyInfo() {
        return authInstance.get('/api/user/info')
    },

    getUsersInfo(usersId) {
        return authInstance.get('/api/user/info', {data: {usersId}})
    },

    setAvatar(formData) {
        return authInstance.put('/api/user/setavatar', formData)
    }
}