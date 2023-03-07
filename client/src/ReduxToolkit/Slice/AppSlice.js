import {createSlice} from "@reduxjs/toolkit";
import {DefaultApi} from "../../Api/Api";

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        Input: "",
        Data: null,
        Success: false,
        ListError: "",
        File: null,
        FileFormActive: true
    },

    reducers: {
        setSuccess(state, {payload}) {
            state.Success = payload
        },
        changeInput(state, {payload}) {
            state.Input = payload
        },
        setData(state, {payload}) {
            state.Data = payload ? payload.map((e, index) => ({
                id: e.id,
                text: e.text
            })) : null
        },
        sortData(state, {payload}) {
            state.Data = state.Data ? state.Data.sort((a, b) => a.id - b.id) : null
        },
        addList(state, {payload}) {
            if (!state.Data) {
                state.Data = [{
                    id: payload.id,
                    text: payload.text
                }]
            } else {
                state.Data.push({
                    id: payload.id,
                    text: payload.text
                })
            }
        },
        deleteList(state, {payload}) {
            state.Data = state.Data.filter(e => e.id !== payload)
        },
        setListError(state, {payload}) {
            state.ListError = payload
        },
        setFile(state, {payload}) {
            state.File = payload
        },
        setActiveFileForm(state, {payload}) {
            state.FileFormActive = payload
        }
    }
})

export const getDataThunk = (userId) => {
    return async (dispatch) => {
        await DefaultApi.getList(userId).then(response => {
            if (response.data.result_code === 1) {
                dispatch(setData(null))
                return
            }
            dispatch(setData(response.data))
            dispatch(sortData())
            dispatch(setSuccess(true))
        }, error => {
            dispatch(setData(null))
        })
    }
}
export const deleteListThunk = (id) => {
    return async (dispatch) => {
        await DefaultApi.deleteList(id).then(response => {
            dispatch(deleteList(response.id))
        }, error => {
            dispatch(setListError(error.response.data.message))
        })
    }
}

export const addListThunk = (text, userId) => {
    return async (dispatch) => {
        await DefaultApi.addList(text, userId).then(response => {
            dispatch(addList(response))
            dispatch(changeInput(""))
            dispatch(setActiveFileForm(false))
        }, error => {
            dispatch(setListError(error.response.data.message))
        })
    }
}

export const uploadFileThunk = (file) => {
    return async (dispatch) => {
        await DefaultApi.addFile(file).then(response => {
            console.log(response);
        })
        dispatch(setFile(file))
    }
}


export default AppSlice.reducer

export const {
    setSuccess,
    changeInput,
    setData,
    sortData,
    addList,
    deleteList,
    setListError,
    setFile,
    setActiveFileForm,
} = AppSlice.actions