import { Language } from '@core/types';
import i18n from '@i18n';
import { createPersistenceStore } from '@utilities/store';

type Theme = 'auto' | 'light' | 'dark';

interface CommonState {
  theme: Theme;
  language: Language;
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
}

const useCommonStore = createPersistenceStore<CommonState>(
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
