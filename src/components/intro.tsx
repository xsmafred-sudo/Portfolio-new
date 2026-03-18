'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const Intro = () => {
  const { ref } = useSectionInView('Home');
  const dict = useDictionary();

  return (
    <section
      ref={ref}
      id="home"
      className="my-10 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Link
          href="#contact"
          className="flex items-center gap-3 rounded border px-3 py-1"
        >
          <span className="relative flex size-2">
            <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative flex size-2 rounded-full bg-green-400"></span>
          </span>
          <span className="font-mono text-sm">{dict.hero.available}</span>
        </Link>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold md:text-5xl"
      >
        {dict.hero.name} —{' '}
        <span className="bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-transparent">
          {dict.hero.title}
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground max-w-xl"
      >
        {dict.hero.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-row gap-2"
      >
        <Button asChild size="lg">
          <Link
            href="MOUIL PROSPER UPDATE 2026.pdf"
            download="MOUIL_PROSPER_RESUME.pdf"
          >
            {dict.hero.downloadResume}{' '}
            <Icons.download className="ml-2 size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://linkedin.com/in/prosper-merimee"
            aria-label="Linkedin"
            target="_blank"
          >
            <Icons.linkedin className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/Menendezpolo5"
            aria-label="Github"
            target="_blank"
          >
            <Icons.github className="size-5" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://wa.me/237691958707"
            aria-label="WhatsApp"
            target="_blank"
          >
            <Icons.whatsapp className="size-5" />
          </Link>
        </Button>
      </motion.div>
      <div className="text-muted-foreground mt-4 text-sm">
        <span>{dict.hero.location}</span>
      </div>
    </section>
  );
};
