import { Language } from '@/core/types';
import i18n from '@/i18n';
import {
  changeKeyboardAppearance,
  createPersistenceStore,
  getCurrentLanguage,
  tailwind,
} from '@/utils';
import { Appearance } from 'react-native';

type Theme = 'auto' | 'light' | 'dark';

type CommonState = {
  theme: Theme;
  language: Language;
};

type CommonActions = {
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
};

const additionalActions: CommonActions = {
  changeLanguage: language => {
    i18n.changeLanguage(language);
  },
  changeTheme: theme => {
    const colorScheme = theme === 'auto' ? Appearance.getColorScheme() ?? 'light' : theme;
    tailwind.setColorScheme(colorScheme);
    if (isIos()) changeKeyboardAppearance(colorScheme);
  },
};

const useCommonStore = createPersistenceStore<CommonState & CommonActions>(
  'common',
  set => ({
    theme: 'auto',
    language: getCurrentLanguage(),
    changeLanguage: language =>
      set(state => {
        state.language = language;
        additionalActions.changeLanguage(language);
      }),
    changeTheme: theme =>
      set(state => {
        state.theme = theme;
        additionalActions.changeTheme(theme);
      }),
  }),
  {
    onRehydrateStorage: () => innerState => {
      if (innerState?.language) additionalActions.changeLanguage(innerState.language);
      if (innerState?.theme) additionalActions.changeTheme(innerState.theme);
    },
  },
);

export default useCommonStore;
