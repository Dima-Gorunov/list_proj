import {
  createDraftSafeSelectorCreator,
  weakMapMemoize,
} from "@reduxjs/toolkit";
import { RootState } from "../../1_app/model/AppStore";

const createWeakMapDraftSafeSelector =
  createDraftSafeSelectorCreator(weakMapMemoize);
const selectSelf = (state: RootState) => state;

export const getUserAuthErrorSelector = createWeakMapDraftSafeSelector(
  selectSelf,
  (state) => state.profileState.authError
);


export const getProfileSelector = createWeakMapDraftSafeSelector(
  selectSelf,
  (state) => state.profileState.user
);

