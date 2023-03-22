import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/"
})

const authInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.authorization);
    return config
}


authInstance.interceptors.request.use(authInterceptor)  // связывает authInstance и authInterceptor
authInstance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await instance.get('api/user/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return authInstance.request(originalRequest)
        } catch (e) {
            console.log("не авторизован");
        }
    }
    throw error
})

export {
    authInstance,
    instance
}

