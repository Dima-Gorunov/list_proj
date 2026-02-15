import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilesApi } from "./Api";
import { IDeleteMyFilesResponse, IFile, IGetMyFilesResponse, IUploadResponse } from "./types";
import { LOCAL_ST_TOKEN_STR } from "../../6_shared/constants";
import { ProfileApi } from "../Profile/Api";

// Тип для состояния слайса
export interface IFilesState {
    profileFiles: IFile[];
    profileFilesLoading: boolean;
    loading: boolean;
}

export const uploadFileThunk = createAsyncThunk<IUploadResponse, File>("filesSlice/uploadFileThunk", async (file, { rejectWithValue }) => {
    try {
        const response = await FilesApi.upload(file);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getMyFilesThunk = createAsyncThunk<IGetMyFilesResponse>("filesSlice/getMyFilesThunk", async (_, { rejectWithValue }) => {
    try {
        const response = await ProfileApi.getMyFiles();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deletefilesThunk = createAsyncThunk<IDeleteMyFilesResponse, number[]>("filesSlice/deletefilesThunk", async (ids, { rejectWithValue }) => {
    try {
        const response = await FilesApi.delete(ids);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Начальное состояние с типом
const initialState: IFilesState = {
    profileFiles: [],
    loading: false,
    profileFilesLoading: true,
};

export const filesSlice = createSlice({
    name: "filesState",
    initialState,
    reducers: {
        setSome: (state) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyFilesThunk.pending, (state) => {
                state.profileFilesLoading = true;
            })
            .addCase(getMyFilesThunk.fulfilled, (state, action) => {
                state.profileFilesLoading = false;
                state.profileFiles = action.payload.files;
            })
            .addCase(getMyFilesThunk.rejected, (state, action) => {
                state.profileFilesLoading = false;
            })
            .addCase(deletefilesThunk.pending, (state) => {
                state.profileFilesLoading = true;
            })
            .addCase(deletefilesThunk.fulfilled, (state, action) => {
                state.profileFilesLoading = false;
                let deleteIds = [];
                for (let index = 0; index < action.payload.details.length; index++) {
                    const item = action.payload.details[index];
                    if (item.database.success) {
                        deleteIds.push(item.fileId);
                    }
                }

                for (let index = 0; index < deleteIds.length; index++) {
                    state.profileFiles = state.profileFiles.filter((item) => item.id !== deleteIds[index]);
                }
            })
            .addCase(deletefilesThunk.rejected, (state, action) => {
                state.profileFilesLoading = false;
            })
            .addCase(uploadFileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadFileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profileFiles.push(action.payload.file);
            })
            .addCase(uploadFileThunk.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const { setSome } = filesSlice.actions;
