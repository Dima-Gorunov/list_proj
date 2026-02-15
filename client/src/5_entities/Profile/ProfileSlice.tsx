import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileApi } from "./Api";
import { IProfile, RegistrationRequest, RegistrationResponse } from "./types";
import { LOCAL_ST_TOKEN_STR } from "../../6_shared/constants";

// Тип для состояния слайса
export interface IProfileState {
    user: IProfile;
    loading: boolean;
    userError: string;
    authError: boolean;
}

export const checkAuthThunk = createAsyncThunk("profileSlice/checkAuthThunk", async (_, { rejectWithValue }) => {
    try {
        const response = await ProfileApi.checkAuth();
        localStorage.setItem(LOCAL_ST_TOKEN_STR, response.data.accessToken);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const logoutThunk = createAsyncThunk("profileSlice/logoutThunk", async (_, { rejectWithValue }) => {
    try {
        const response = await ProfileApi.logout();
        return response.data;
    } catch (error) {
        localStorage.removeItem(LOCAL_ST_TOKEN_STR);
        return rejectWithValue(error.message);
    }
});

export const registrationThunk = createAsyncThunk<RegistrationResponse, RegistrationRequest>(
    "profileSlice/registrationThunk",
    async ({ email, password, secretAdminString }, { rejectWithValue }) => {
        try {
            const response = await ProfileApi.registration({ email, password, secretAdminString });
            localStorage.setItem(LOCAL_ST_TOKEN_STR, response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const loginThunk = createAsyncThunk<RegistrationResponse, RegistrationRequest>(
    "profileSlice/loginThunk",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await ProfileApi.login(email, password);

            localStorage.setItem(LOCAL_ST_TOKEN_STR, response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Начальное состояние с типом
const initialState: IProfileState = {
    user: {
        id: null,
        email: null,
        username: null,
        role: null,
        activated: false,
        isAdmin: false,
        avatar: null,
        firstName: null,
        lastName: null,
        gender: null,
        createdAt: null,
        updatedAt: null,
    },
    loading: true,
    userError: "",
    authError: false,
};

export const profileSlice = createSlice({
    name: "profileState",
    initialState,
    reducers: {
        setLogout: (state) => {
            state.user = null;
            localStorage.removeItem(LOCAL_ST_TOKEN_STR);
        },
        setLogin: (state, { payload }: { payload: IProfile }) => {
            state.user = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(registrationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.userError = null;
            })
            .addCase(registrationThunk.rejected, (state, action) => {
                state.loading = false;
                state.userError = action.error.message;
            })
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.userError = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.userError = action.error.message;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                localStorage.removeItem(LOCAL_ST_TOKEN_STR);
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                // state.loading = false;
                // state.userError = action.error.message;
            })
            .addCase(checkAuthThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authError = false;
            })
            .addCase(checkAuthThunk.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.authError = true;
            });
    },
});

export const { setLogout } = profileSlice.actions;
