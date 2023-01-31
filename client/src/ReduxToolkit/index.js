import AppSlice from "./Slice/AppSlice";
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";


const RootReducer = combineReducers({
    App: AppSlice,
    UserState: UserSlice
})

export const store = configureStore({
    reducer: RootReducer
})