import {createSlice} from "@reduxjs/toolkit";
import {DefaultApi} from "../../Api/Api";

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        Input: "",
        Data: null,
        Success: false
    },

    reducers: {
        setSuccess(state, action) {
            state.Success = action.payload
        },
        changeInput(state, action) {
            state.Input = action.payload
        },
        setData(state, action) {
            state.Data = state.Data ? state.Data : action.payload.map((e, index) => ({
                id: e.id,
                text: e.text
            }))
        },
        sortData(state, action) {
            state.Data = state.Data.sort((a, b) => a.id - b.id)
        },
        addList(state, action) {
            state.Data.push({
                id: action.payload.id,
                text: action.payload.text
            })
        },
        deleteList(state, action) {
            state.Data = state.Data.filter(e => e.id !== action.payload)
        }
    }
})

export const getDataThunk = () => {
    return async (dispatch) => {
        await DefaultApi.getList().then(response => {
            if (response.result_code === 1) {
                return
            }
            dispatch(AppSlice.actions.setData(response.data))
            dispatch(AppSlice.actions.sortData())
            dispatch(AppSlice.actions.setSuccess(true))
        })
    }
}
export const deleteListThunk = (id) => {
    return async (dispatch) => {
        await DefaultApi.deleteList(id)
        dispatch(AppSlice.actions.deleteList(id))
    }
}

export const addListThunk = (text) => {
    return async (dispatch) => {
        await DefaultApi.addList(text).then(response => {
            dispatch(AppSlice.actions.addList(response))
        })
    }
}


export default AppSlice.reducer

export const {
    changeInput
} = AppSlice.actions