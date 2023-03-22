import axios from "axios";
import jwtDecode from "jwt-decode";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
})

const authInstance = axios.create({                     // далее прикрепляет в хедер auth токен
    baseURL: "http://localhost:5000/"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.authorization);
    return config
}

authInstance.interceptors.request.use(authInterceptor)  // связывает authInstance и authInterceptor


export const ListApi = {
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
}