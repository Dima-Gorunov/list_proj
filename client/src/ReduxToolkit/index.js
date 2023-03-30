import AppSlice from "./Slice/AppSlice";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import PostSlice from "./Slice/PostSlice";


const RootReducer = combineReducers({
    App: AppSlice,
    UserState: UserSlice,
    PostState: PostSlice
})

export const store = configureStore({
    reducer: RootReducer
})