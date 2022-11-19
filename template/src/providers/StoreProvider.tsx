import { ActivityIndicator } from '@components/core';
import store, { persistor } from '@store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const StoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
