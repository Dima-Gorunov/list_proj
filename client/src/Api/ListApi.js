import {authInstance, instance} from "./AuthInstance"

export const ListApi = {
    getAllList(page = 1, perPage = 10) {
        return authInstance.get(`/api/list/all?page=${page}&perPage=${perPage}`)
    },
    getMyList(page, perPage) {
        return authInstance.get(`/api/list?page=${page}&perPage=${perPage}`)
    },
    addMyPost(formData) {
        // formData ={text:**, file:**}
        return authInstance.post('/api/list', formData)
    },
    deleteList(id) {
        return authInstance.delete('/api/list', {data: {id}})
    },
}