import { DEFAULT_NAMESPACE, LANGUAGE_MAP } from '@/core/constants';
import { Language, LanguageMap } from '@/core/types';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/vi';
import i18next, { ResourceLanguage } from 'i18next';
import numeral from 'numeral';
import 'numeral/locales/en-gb';
import 'numeral/locales/vi';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US.json';
import viVN from './locales/vi-VN.json';
import { getLocales } from 'react-native-localize';

class I18next {
  private static readonly currentLanguage: Language = I18next.getCurrentLanguage();
  private static readonly fallbackLanguage: Language = 'en-US';

  private static readonly resources: LanguageMap<ResourceLanguage> = {
    'en-US': { [DEFAULT_NAMESPACE]: enUS },
    'vi-VN': { [DEFAULT_NAMESPACE]: viVN },
  };

  static init(): void {
    I18next.changeLocaleFormatters(I18next.currentLanguage);

    i18next.use(initReactI18next).init({
      lng: I18next.currentLanguage,
      fallbackLng: I18next.fallbackLanguage,
      ns: DEFAULT_NAMESPACE,
      resources: I18next.resources,
      compatibilityJSON: 'v3',
      interpolation: {
        skipOnVariables: false,
      },
    });

    i18next.on('languageChanged', I18next.changeLocaleFormatters);
  }

  private static changeLocaleFormatters(language: Language): void {
    const key = LANGUAGE_MAP[language];
    dayjs.locale(key);
    numeral.locale(key);
  }

  static getCurrentLanguage(): Language {
    const [{ languageCode }] = getLocales();

    const languages: Record<string, Language> = {
      en: 'en-US',
      vi: 'vi-VN',
    };

    return languages[languageCode] || languages.en;
  }
}

const I18n = Object.setPrototypeOf(I18next, i18next);
export default I18n;
