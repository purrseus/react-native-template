import { Language } from '@/core/types';
import { ColorSchemeName, Keyboard } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import { getLocales } from 'react-native-localize';

export const getCurrentLanguage = () => {
  const [{ languageCode }] = getLocales();

  const languages: Record<string, Language> = {
    en: 'en-US',
    vi: 'vi-VN',
  };

  return languages[languageCode] || languages.en;
};

export const changeKeyboardAppearance = (colorScheme: ColorSchemeName) => {
  Keyboard.dismiss();
  KeyboardManager.setKeyboardAppearance(colorScheme || 'light');
  KeyboardManager.setToolbarBarTintColor(colorScheme === 'dark' ? '#000000' : '#FFFFFF');
};
