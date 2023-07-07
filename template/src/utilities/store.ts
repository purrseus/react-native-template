import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { create, StateCreator } from 'zustand';
import { StateStorage, PersistOptions, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const MMKVStorage = new MMKV();

if (__DEV__) initializeMMKVFlipper({ default: MMKVStorage });

const persistStorage: StateStorage = {
  setItem: (name, value) => MMKVStorage.set(name, value),
  getItem: name => MMKVStorage.getString(name) ?? null,
  removeItem: name => MMKVStorage.delete(name),
};

export const createPersistOptions = <T>(
  name: string,
  additionalOptions?: Partial<PersistOptions<T, T>>,
): PersistOptions<T, T> => ({
  version: 1,
  name: `${Config.APP_NAME}/${name}-storage`,
  storage: createJSONStorage(() => persistStorage),
  ...additionalOptions,
});

export const createPersistenceStore = <T>(
  name: string,
  initializer: StateCreator<T, [['zustand/persist', unknown], ['zustand/immer', never]], [], T>,
  persistOptions?: Parameters<typeof createPersistOptions<T>>[1],
) => create<T>()(persist(immer(initializer), createPersistOptions<T>(name, persistOptions)));
