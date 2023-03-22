import {authInstance, instance} from "./AuthInstance"

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