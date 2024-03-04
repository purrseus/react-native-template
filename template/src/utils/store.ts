import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions, StateStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export class Store {
  static readonly MMKVStorage = new MMKV();

  static init(): void {
    if (__DEV__) initializeMMKVFlipper({ default: Store.MMKVStorage });
  }

  private static readonly persistStorage: StateStorage = {
    setItem: (name, value) => Store.MMKVStorage.set(name, value),
    getItem: name => Store.MMKVStorage.getString(name) ?? null,
    removeItem: name => Store.MMKVStorage.delete(name),
  };

  static createPersistenceStore<T>(
    name: string,
    initializer: StateCreator<T, [['zustand/persist', unknown], ['zustand/immer', never]], [], T>,
    persistOptions?: Partial<PersistOptions<T, T>>,
  ) {
    const options: PersistOptions<T, T> = {
      version: 1,
      name: `${Config.APP_NAME}/${name}-storage`,
      storage: createJSONStorage<T>(() => Store.persistStorage),
      ...persistOptions,
    };

    return create<T>()(persist(immer(initializer), options));
  }
}
