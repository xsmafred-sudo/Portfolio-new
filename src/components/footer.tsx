import Link from 'next/link';

import { Button } from '@/components/button';
import { useDictionary } from '@/hooks/use-dictionary';

export const Footer = () => {
  const dict = useDictionary();

  return (
    <footer className="text-muted-foreground my-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
      © {new Date().getFullYear()}{' '}
      <Button variant="link" className="text-muted-foreground p-0 font-medium">
        <a href="https://github.com/Menendezpolo5">Prosper</a>
      </Button>
      . {dict.footer.rights}
      <span className="mx-2">|</span>
      <Button variant="link" className="text-muted-foreground p-0 font-medium">
        <Link href="/blog">{dict.footer.blog}</Link>
      </Button>
    </footer>
  );
};
