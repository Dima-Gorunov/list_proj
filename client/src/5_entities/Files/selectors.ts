import { createDraftSafeSelectorCreator, weakMapMemoize } from "@reduxjs/toolkit";
import { RootState } from "../../1_app/model/AppStore";

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);
const selectSelf = (state: RootState) => state;

export const getProfileFilesSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => state.filesState.profileFiles);
export const getProfileFilesLoadingSelector = createWeakMapDraftSafeSelector(selectSelf, (state) => state.filesState.profileFilesLoading);
