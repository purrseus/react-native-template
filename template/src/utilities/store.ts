import { Slice } from '@reduxjs/toolkit';
import { storage } from '@store/integration';
import Config from 'react-native-config';
import { PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const createPersistReducer = <
  S extends Slice,
  State extends ReturnType<S['getInitialState']>,
>(
  slice: S,
  config?: Partial<PersistConfig<State>>,
) => {
  const persistConfig: PersistConfig<State> = {
    storage,
    version: 1,
    key: `${Config.APP_NAME!.removeWhiteSpaces()}/${slice.name}`,
    stateReconciler: autoMergeLevel2,
    ...config,
  };

  return persistReducer<State>(persistConfig, slice.reducer);
};
