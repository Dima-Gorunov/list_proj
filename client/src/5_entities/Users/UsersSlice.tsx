import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersApi } from "./Api";
import { IChangeUserResponce, IUser, IUsersResponce } from "./types";

// Тип для состояния слайса
export interface IProfileState {
    users: IUser[];
    usersLoading: Boolean;
}

export const getAllUsersThunk = createAsyncThunk<IUsersResponce>("usersSlice/getAllUsersThunk", async (_, { rejectWithValue }) => {
    try {
        const response = await UsersApi.getAllUsers();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const changeUserThunk = createAsyncThunk<IChangeUserResponce, IUser>("usersSlice/changeUserThunk", async (data, { rejectWithValue }) => {
    try {
        const response = await UsersApi.changeUser(data);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Начальное состояние с типом
const initialState: IProfileState = {
    users: [],
    usersLoading: true,
};

export const usersSlice = createSlice({
    name: "usersState",
    initialState,
    reducers: {
        setLogout: (state) => {
            // state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersThunk.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(getAllUsersThunk.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.usersLoading = false;
            })
            .addCase(getAllUsersThunk.rejected, (state, action) => {
                state.users = [];
                state.usersLoading = false;
            })
            .addCase(changeUserThunk.pending, (state) => {
                // state.usersLoading = true;
            })
            .addCase(changeUserThunk.fulfilled, (state, action) => {
                const fIndex = state.users.findIndex((item) => item.id === action.payload.user.id);
                if (fIndex !== -1) {
                    state.users[fIndex] = action.payload.user;
                }
                // state.usersLoading = false;
            })
            .addCase(changeUserThunk.rejected, (state, action) => {
                // state.users = [];
                // state.usersLoading = false;
            });
    },
});
