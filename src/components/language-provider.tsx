'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useCookies } from 'react-cookie';
import {
  languages,
  type LanguageCode,
  getDictionary,
  type Dictionary,
} from '@/lib/i18n';

type LanguageContextType = {
  locale: LanguageCode;
  dictionary: Dictionary;
  direction: 'ltr' | 'rtl';
  setLocale: (locale: LanguageCode) => void;
  languages: typeof languages;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [cookies, setCookie] = useCookies(['locale']);
  const [locale, setLocaleState] = useState<LanguageCode>('en');

  useEffect(() => {
    const savedLocale = cookies.locale;
    if (savedLocale && languages.some((l) => l.code === savedLocale)) {
      setLocaleState(savedLocale as LanguageCode);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const matchedLang = languages.find((l) => l.code === browserLang);
      if (matchedLang) {
        setLocaleState(matchedLang.code);
        setCookie('locale', matchedLang.code, { path: '/', maxAge: 31536000 });
      }
    }
  }, [cookies.locale, setCookie]);

  const setLocale = (newLocale: LanguageCode) => {
    setLocaleState(newLocale);
    setCookie('locale', newLocale, { path: '/', maxAge: 31536000 });
  };

  const dictionary = getDictionary(locale);
  const direction = 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [direction, locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dictionary,
        direction,
        setLocale,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
