import AppSlice from "./Slice/AppSlice";
import {configureStore, combineReducers} from "@reduxjs/toolkit";


const RootReducer = combineReducers({
    App: AppSlice
})

export const store = configureStore({
    reducer: RootReducer
})