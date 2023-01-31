import {createSlice} from "@reduxjs/toolkit";
import {DefaultApi} from "../../Api/Api";

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: {
        User: {
            id: null,
            email: null,
            username: null,
            role: null,
            isAuth: false,
        },
        UserError: ""
    },
    reducers: {
        setAuth(state, {payload}) {
            state.User.id = payload.id
            state.User.email = payload.email
            state.User.username = payload.username
            state.User.role = payload.role
            state.User.isAuth = !!payload.id
        },
        setUserError(state, {payload}) {
            state.UserError = payload
        }
    }
})

export const regThunk = (email, password) => {
    return async (dispatch) => {
        await DefaultApi.registration(email, password).then(response => {
                dispatch(UserSlice.actions.setAuth(response))
                dispatch(UserSlice.actions.setUserError(""))
            }
            /*, error => {
            // если мы обработаем ошибку тут, то в компоненте не сможем её обработать и попать в блок catch
            //    делаем для того чтобы перенаправить в случае успешного запроса на сервер
                dispatch(UserSlice.actions.setUserError(error.response.data.message))
            }*/)
    }
}

export const setAuthThunk = (email, password) => {
    return async (dispatch) => {
        await DefaultApi.login(email, password).then(response => {
                dispatch(UserSlice.actions.setAuth(response))
                dispatch(UserSlice.actions.setUserError(""))
            }
            /*, error => {
            // если мы обработаем ошибку тут, то в компоненте не сможем её обработать и попать в блок catch
            //    делаем для того чтобы перенаправить в случае успешного запроса на сервер.
                dispatch(UserSlice.actions.setUserError(error.response.data.message))
            }*/)
    }
}

export const logoutThunk = () => {
    return async (dispatch) => {
        localStorage.setItem('token', "")
    }
}

export const checkThunk = () => {
    return async (dispatch) => {
        await DefaultApi.check().then(data => {
            dispatch(UserSlice.actions.setAuth(data))
        })
    }
}

export default UserSlice.reducer

export const {
    setAuth,
    setUserError
} = UserSlice.actions