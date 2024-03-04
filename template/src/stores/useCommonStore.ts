import { Language, Theme } from '@/core/types';
import I18n from '@/i18n';
import { Store, IOSKeyboardManager, TailwindService } from '@/utils';
import { Appearance } from 'react-native';

type CommonState = {
  theme: Theme;
  language: Language;
};

type CommonActions = {
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
};

const useCommonStore = Store.createPersistenceStore<CommonState & CommonActions>(
  'common',
  set => ({
    theme: 'auto',
    language: I18n.getCurrentLanguage(),
    changeLanguage: language =>
      set(state => {
        state.language = language;
        I18n.changeLanguage(language);
      }),
    changeTheme: theme =>
      set(state => {
        state.theme = theme;
        TailwindService.changeTheme(theme);
      }),
  }),
  {
    onRehydrateStorage: () => innerState => {
      if (innerState?.language) I18n.changeLanguage(innerState.language);
      if (innerState?.theme) TailwindService.changeTheme(innerState.theme);
    },
  },
);

Appearance.addChangeListener(({ colorScheme }) => {
  if (useCommonStore.getState().theme === 'auto')
    IOSKeyboardManager.changeKeyboardAppearance(colorScheme);
});

export default useCommonStore;
