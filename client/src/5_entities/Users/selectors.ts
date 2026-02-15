import { createDraftSafeSelectorCreator, weakMapMemoize } from "@reduxjs/toolkit";
import { RootState } from "../../1_app/model/AppStore";

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);
const selectSelf = (state: RootState) => state;

export const getAllUsersSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => state.usersState.users);
export const getUsersloadingSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => state.usersState.usersLoading);
