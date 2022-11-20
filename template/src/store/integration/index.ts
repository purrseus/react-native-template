import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { Storage } from 'redux-persist';

export const MMKVStorage = new MMKV();

if (__DEV__) initializeMMKVFlipper({ default: MMKVStorage });

export const storage: Storage = {
  setItem: (key, value) => {
    MMKVStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = MMKVStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    MMKVStorage.delete(key);
    return Promise.resolve();
  },
};
