import axios from "axios";
import jwtDecode from "jwt-decode";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
})

const authInstance = axios.create({                     // далее прикрепляет в хедер auth токен
    baseURL: "http://localhost:5000/"
})

const multipartInstance = axios.create({
    baseURL: "http://localhost:5000/"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.authorization);
    return config
}

authInstance.interceptors.request.use(authInterceptor)  // связывает authInstance и authInterceptor

export const DefaultApi = {
    check() {
        return authInstance.get(`api/user/auth`).then(response => {
            localStorage.setItem('token', response.data.token)
            console.log(jwtDecode(response.data.token));
            return jwtDecode(response.data.token)
        })
    },
    registration(email, password) {
        return instance.post(`api/user/registration`, {email, password}).then(response => {
            localStorage.setItem('token', response.data.token)
            console.log("reg");
            return jwtDecode(response.data.token)
        })
    },
    login(email, password) {
        return instance.post('api/user/login', {email, password}).then(response => {
            localStorage.setItem('token', response.data.token)
            return jwtDecode(response.data.accessToken)
        })
    },
    getInfo() {
        return authInstance.get('api/user/info').then(response => {
            return response.data
        })
    },
    getList() {
        return authInstance.get(`api/list`)
    },
    addList(formData) {
        // formData ={text:**, file:**}
        return authInstance.post('api/list', formData)
    },
    deleteList(id) {
        return authInstance.delete('api/list', {data: {id}})
    },
    addFile(formData) {
        //  formData.append("data", some_data) => then on back some_data===req.body.data
        formData.append('dataform', "form append")
        return authInstance.post('api/file/upload', formData)
    },
    getFile() {
        return authInstance.get('api/file', {responseType: 'blob'}).then(response => {
            return URL.createObjectURL(response.data)
        })
    },
    getAvatar() {
        return authInstance.get('api/user/avatar', {responseType: 'blob'}).then(response => {
            return URL.createObjectURL(response.data)
        })
    },
    setAvatar(formData) {
        return authInstance.put('api/user/setavatar', formData)
    }
}


