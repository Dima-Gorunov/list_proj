import { createSlice } from "@reduxjs/toolkit";
import { ISideBarItems } from "./types";
import { FRONT_ROLES_STR, FRONT_ROUTES_STR } from "../../../6_shared/constants";

interface InitialStateSideBar {
    items: ISideBarItems;
    open: boolean;
    mobileBarOpen: boolean;
}

const initialState: InitialStateSideBar = {
    items: [
        { id: "1a", text: "Основное", link: `/${FRONT_ROUTES_STR.main}`, selected: false, role: [FRONT_ROLES_STR.ADMIN, FRONT_ROLES_STR.USER] },
        { id: "1b", text: "Пользователи", link: `/${FRONT_ROUTES_STR.users}`, selected: false, role: [FRONT_ROLES_STR.ADMIN] },
        { id: "1c", text: "Мой профиль", link: `/${FRONT_ROUTES_STR.myProfile}`, selected: false, role: [FRONT_ROLES_STR.ADMIN, FRONT_ROLES_STR.USER] },
    ],
    open: false,
    mobileBarOpen: false,
};

export const sideBarSlice = createSlice({
    name: "sidebarState",
    initialState,

    reducers: {
        setSideBarOpen: (state, { payload }: { payload: boolean }) => {
            state.open = payload;
        },
        setMobileBarOpen: (state, { payload }: { payload: boolean }) => {
            state.open = payload;
        },
    },
});

export const { setSideBarOpen, setMobileBarOpen } = sideBarSlice.actions;
