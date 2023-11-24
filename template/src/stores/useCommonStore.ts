import { Language } from '@/core/types';
import i18n from '@/libs/i18n';
import { createPersistenceStore } from '@/utils/store';

type Theme = 'auto' | 'light' | 'dark';

type CommonState = {
  theme: Theme;
  language: Language;
};

type CommonActions = {
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
};

const useCommonStore = createPersistenceStore<CommonState & CommonActions>(
  'common',
  set => ({
    theme: 'auto',
    language: 'en-US',
    changeLanguage: language =>
      set(state => {
        state.language = language;
        i18n.changeLanguage(language);
      }),
    changeTheme: theme =>
      set(state => {
        state.theme = theme;
      }),
  }),
  {
    onRehydrateStorage: () => innerState => {
      if (innerState?.language) i18n.changeLanguage(innerState.language);
    },
  },
);

export default useCommonStore;
