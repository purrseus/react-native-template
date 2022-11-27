import { Language } from '@core/types';
import i18n from '@i18n';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPersistReducer, getCurrentLanguage } from '@utilities';
import { REHYDRATE } from 'redux-persist';

type Theme = 'auto' | 'light' | 'dark';

interface CommonState {
  language: Language;
  theme: Theme;
}

const SLICE_NAME = 'common';

const rehydrateAction = createAction<Partial<CommonState> | undefined>(REHYDRATE);

const initialState: CommonState = {
  language: getCurrentLanguage(),
  theme: 'auto',
};

const commonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    changeLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.language = payload;
      i18n.changeLanguage(payload);
    },
    changeTheme: (state, { payload }: PayloadAction<Theme>) => {
      state.theme = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(rehydrateAction, (_, { payload }) => {
      if (payload?.language) i18n.changeLanguage(payload.language);
    });
  },
});

export const commonActions = commonSlice.actions;
export default createPersistReducer(commonSlice);
