import enUS from './locales/en-US.json';
import viVN from './locales/vi-VN.json';
import { DEFAULT_NAMESPACE, LANGUAGE_MAP } from '@core/constants';
import { Language, LanguageMap } from '@core/types';
import { getCurrentLanguage } from '@utilities/common';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/vi';
import i18n, { ResourceLanguage } from 'i18next';
import numeral from 'numeral';
import 'numeral/locales/en-gb';
import 'numeral/locales/vi';
import { initReactI18next } from 'react-i18next';

const CURRENT_LANGUAGE = getCurrentLanguage();
const FALLBACK_LANGUAGE: Language = 'en-US';

const resources: LanguageMap<ResourceLanguage> = {
  'en-US': { [DEFAULT_NAMESPACE]: enUS },
  'vi-VN': { [DEFAULT_NAMESPACE]: viVN },
};

const changeLocaleFormatters = (language: Language) => {
  const key = LANGUAGE_MAP[language];
  dayjs.locale(key);
  numeral.locale(key);
};

changeLocaleFormatters(CURRENT_LANGUAGE);

i18n.use(initReactI18next).init({
  lng: CURRENT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  ns: DEFAULT_NAMESPACE,
  resources,
  compatibilityJSON: 'v3',
  interpolation: {
    skipOnVariables: false,
  },
});

i18n.on('languageChanged', changeLocaleFormatters);

export default i18n;
