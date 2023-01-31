import axios from "axios";
import jwtDecode from "jwt-decode";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
})

const authInstance = axios.create({
    baseURL: "http://localhost:5000/"
})
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
authInstance.interceptors.request.use(authInterceptor)

export const DefaultApi = {
    check() {
        return authInstance.get(`api/user/auth`).then(response => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        })
    },
    registration(email, password) {
        return instance.post(`api/user/registration`, {email, password}).then(response => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        })
    },
    login(email, password) {
        return instance.post('api/user/login', {email, password}).then(response => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.token)
        })
    },
    getList(userId) {
        console.log(` id on axios: ${userId}`);
        return instance.get(`api/list?userId=${userId}`)
    },
    addList(text, userId) {
        return instance.post('api/list', {text: text, userId: userId}).then(response => response.data)
    }
}


export const authApi = {
    getList() {
        return instance.get(`api/list`)
    },
    deleteList(id) {
        return instance.delete(`api/list`, {data: {id: id}})
    }
}

