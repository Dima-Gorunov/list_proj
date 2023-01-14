import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/"
})

export const DefaultApi = {
    getList() {
        return instance.get(`api/list`)
    },
    deleteList(id) {
        return instance.delete(`api/list`, {data: {id: id}})
    },
    addList(text) {
        return instance.post('api/list', {text: text}).then(response => response.data)
    }
}