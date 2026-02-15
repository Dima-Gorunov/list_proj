import { createDraftSafeSelectorCreator, weakMapMemoize } from "@reduxjs/toolkit";
import { RootState } from "../../../1_app/model/AppStore";

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);
const selectSelf = (state: RootState) => state;

export const getSidebarItemsSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => {
    const userRole = state.profileState?.user?.role;

    return state.sidebarState.items.filter((item) => item.role.includes(userRole));
});

export const getSideBarStatusOpen = createWeakMapDraftSafeSelector(selectSelf, (state) => state.sidebarState.open);

export const getMobilebarOpenSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => state.sidebarState.mobileBarOpen);
