'use client';

import { PropsWithChildren } from 'react';
import { CookiesProvider } from 'react-cookie';

import { LanguageProvider } from '@/components/language-provider';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <CookiesProvider>
      <ThemeProvider attribute="class">
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}
