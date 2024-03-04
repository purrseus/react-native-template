import config from '@/../tailwind.config';
import { Theme } from '@/core/types';
import { Appearance } from 'react-native';
import { create } from 'twrnc';
import { IOSKeyboardManager } from './keyboard';

export class TailwindService {
  static tailwind = create(config);

  static changeTheme(theme: Theme): void {
    const colorScheme = theme === 'auto' ? Appearance.getColorScheme() ?? 'light' : theme;
    TailwindService.tailwind.setColorScheme(colorScheme);
    IOSKeyboardManager.changeKeyboardAppearance(colorScheme);
  }
}
