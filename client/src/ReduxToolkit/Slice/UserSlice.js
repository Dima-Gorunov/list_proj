import {createSlice} from "@reduxjs/toolkit";
import {AuthApi} from "../../Api/AuthApi";

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: {
        User: {
            Id: null,
            Email: null,
            Username: null,
            Role: null,
            IsAuth: false,
            Activate: false,
            IsAdmin: false,
            Avatar: null
        },
        UserError: ""
    },
    reducers: {
        setUser(state, {payload}) {
            state.User.Id = payload?.id || null
            state.User.Email = payload?.email || null
            state.User.Username = payload?.username || null
            state.User.Role = payload?.role || null
            state.User.IsAdmin = payload?.role === "ADMIN" || false
            state.User.Activated = payload?.activated || false
            state.User.Avatar = payload?.avatar || null
        },
        setAuth(state, {payload}) {
            state.User.IsAuth = payload
        },
        setAvatar(state, {payload}) {
            state.User.Avatar = payload
        },
        setUserError(state, {payload}) {
            state.UserError = payload
        }
    }
})

export const regThunk = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await AuthApi.registration(email, password)
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            const userInfo = await AuthApi.getInfo()
            dispatch(setUser(userInfo.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setUserError(e.response?.data?.message || "Error"))
        }
    }
}

export const loginThunk = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await AuthApi.login(email, password)
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            const userInfo = await AuthApi.getInfo()
            dispatch(setUser(userInfo.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setUserError(e.response?.data?.message || "Error"))
        }
    }
}

export const logOutThunk = () => {
    return async (dispatch) => {
        try {
            const response = await AuthApi.logout()  // backend refreshToken=>null
            localStorage.removeItem('token')
            dispatch(setAuth(null))
            dispatch(setUser(null))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}

export const checkAuthThunk = () => {
    return async (dispatch) => {
        try {
            const response = await AuthApi.checkAuth()
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            const userInfo = await AuthApi.getInfo()
            dispatch(setUser(userInfo.data.user))
        } catch (e) {
            console.log(e.response?.data?.message);
            dispatch(setAuth(false))
            dispatch(setUser(null))
        }
    }
}

export default UserSlice.reducer

export const {
    setUser,
    setUserError,
    setAuth
} = UserSlice.actions