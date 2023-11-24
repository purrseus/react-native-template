import enUS from '@/libs/i18n/locales/en-US.json';
import viVN from '@/libs/i18n/locales/vi-VN.json';
import 'i18next';
import { DEFAULT_NAMESPACE } from '../constants';

declare module 'i18next' {
  type DefaultNS = typeof DEFAULT_NAMESPACE;
  type Resources = Record<DefaultNS, typeof enUS & typeof viVN>;
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Resources;
  }
}
