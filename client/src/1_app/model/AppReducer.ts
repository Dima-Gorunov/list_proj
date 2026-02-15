import { combineReducers } from "@reduxjs/toolkit";
import { profileSlice } from "../../5_entities/Profile/ProfileSlice";
import { sideBarSlice } from "../../5_entities/SideBar";
import { usersSlice } from "../../5_entities/Users/UsersSlice";
import { filesSlice } from "../../5_entities/Files/FilesSlice";
export const rootReducer = combineReducers({
    [profileSlice.name]: profileSlice.reducer,
    [sideBarSlice.name]: sideBarSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [filesSlice.name]: filesSlice.reducer,
    // [profileSlice.name]: profileSlice.reducer,
});
