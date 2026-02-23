import { en } from './en';
import type { Dictionary } from './en';
import { fr } from './fr';
import { es } from './es';
import { zh } from './zh';
import { ar } from './ar';
import { de } from './de';
import { pt } from './pt';
import { ja } from './ja';

export const dictionaries = {
  en,
  fr,
  es,
  zh,
  ar,
  de,
  pt,
  ja,
};

export type { Dictionary } from './en';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

export const getDictionary = (locale: string): Dictionary => {
  return dictionaries[locale as keyof typeof dictionaries] || en;
};

export const getLanguageDir = (locale: string): 'ltr' | 'rtl' => {
  const lang = languages.find((l) => l.code === locale);
  return lang?.dir || 'ltr';
};
