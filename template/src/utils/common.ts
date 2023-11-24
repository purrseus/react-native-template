import { Language } from '@/core/types';
import { getLocales } from 'react-native-localize';

export const getCurrentLanguage = () => {
  const [{ languageCode }] = getLocales();

  const languages: Record<string, Language> = {
    en: 'en-US',
    vi: 'vi-VN',
  };

  return languages[languageCode] || languages.en;
};
