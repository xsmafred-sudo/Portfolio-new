'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/button';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { locale, setLocale, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === locale);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border-2 border-cyan-400/30 bg-background shadow-[0_0_10px_rgba(34,211,238,0.15)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      >
        <Globe className="size-5" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-background py-2 shadow-lg md:bottom-full md:top-auto md:mb-2 md:mt-0">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-accent',
                  locale === lang.code && 'bg-accent font-medium'
                )}
              >
                <span className="font-medium">{lang.nativeName}</span>
                <span className="ml-2 text-muted-foreground">
                  ({lang.name})
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
