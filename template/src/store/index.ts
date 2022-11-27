import { configureStore } from '@reduxjs/toolkit';
import createDebugger from 'redux-flipper';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import * as reducer from './slices';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => {
    const middlewareArray = getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return __DEV__ ? middlewareArray.prepend(createDebugger()) : middlewareArray;
  },
  devTools: __DEV__,
});

export const persistor = persistStore(store);

export default store;
