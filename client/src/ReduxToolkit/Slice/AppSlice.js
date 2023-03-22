import {createSlice} from "@reduxjs/toolkit";
import {ListApi} from "../../Api/ListApi";

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        Input: "",
        Data: null,
        Success: false,
        ListError: "",
        File: null,
        FileFormActive: true,
        Image: null
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
                text: e.text,
                img: e.img
            })) : null
        },
        sortData(state, {payload}) {
            state.Data = state.Data ? state.Data.sort((a, b) => b.id - a.id) : null
        },
        addList(state, {payload}) {
            if (!state.Data) {
                state.Data = [{
                    id: payload.id,
                    text: payload.text,
                    img: payload.img
                }]
            } else {
                state.Data.push({
                    id: payload.id,
                    text: payload.text,
                    img: payload.img
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
        },
        setImage(state, {payload}) {
            state.Image = payload
        }
    }
})

export const getDataThunk = () => {
    return async (dispatch) => {
        try {
            const response = await ListApi.getList()
            dispatch(setData(response.data))
            dispatch(sortData())
            dispatch(setSuccess(true))
        } catch (e) {
            console.log(e.message);
            dispatch(setData(null))
        }
    }
}
export const deleteListThunk = (id) => {
    return async (dispatch) => {
        try {
            const response = await ListApi.deleteList(id)
            dispatch(deleteList(response.data.id))
        } catch (e) {
            console.log(e.message);
        }
    }
}

export const addListThunk = (formData) => {
    return async (dispatch) => {
        try {
            const response = await ListApi.addList(formData)
            dispatch(addList(response.data))
            dispatch(sortData())
            dispatch(changeInput(""))
        } catch (e) {
            console.log(e.message);
        }
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
    setActiveFileForm,
    setImage
} = AppSlice.actions