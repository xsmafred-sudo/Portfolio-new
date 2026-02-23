'use client';

import { useTheme } from 'next-themes';

import { Button, ButtonProps } from '@/components/button';
import { Icons } from '@/components/icons';

export const ThemeToggle = ({ className }: ButtonProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={`${className || ''} rounded-full border-2 border-cyan-400/30 bg-background shadow-[0_0_10px_rgba(34,211,238,0.15)] transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]`}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Icons.sun className="size-5 dark:hidden" />
      <Icons.moon className="hidden size-5 dark:block" />
    </Button>
  );
};
