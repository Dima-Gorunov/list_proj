import {createSlice} from "@reduxjs/toolkit";
import {DefaultApi} from "../../Api/Api";

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        Input: "",
        Data: null,
        Success: false,
        ListError: ""
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
            }else {
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
        }
    }
})

export const getDataThunk = (userId) => {
    return async (dispatch) => {
        await DefaultApi.getList(userId).then(response => {
            if (response.data.result_code === 1) {
                dispatch(AppSlice.actions.setData(null))
                return
            }
            dispatch(AppSlice.actions.setData(response.data))
            dispatch(AppSlice.actions.sortData())
            dispatch(AppSlice.actions.setSuccess(true))
        }, error => {
            dispatch(AppSlice.actions.setData(null))
        })
    }
}
export const deleteListThunk = (id) => {
    return async (dispatch) => {
        await DefaultApi.deleteList(id)
        dispatch(AppSlice.actions.deleteList(id))
    }
}

export const addListThunk = (text, userId) => {
    return async (dispatch) => {
        await DefaultApi.addList(text, userId).then(response => {
            dispatch(AppSlice.actions.addList(response))
            dispatch(AppSlice.actions.changeInput(""))
        }, error => {
            dispatch(AppSlice.actions.setListError(error.response.data.message))
        })
    }
}


export default AppSlice.reducer

export const {
    changeInput
} = AppSlice.actions