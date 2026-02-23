'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { AmbientBubble } from '@/components/ui/ambient-bubble';
import { generateAmbientMessage } from '@/lib/groq';
import { motion } from 'framer-motion';

interface SectionConfig {
  id: string;
  context: string;
  triggerTime: number;
  triggered: boolean;
  message?: string;
}

const SECTION_CONFIGS: Omit<SectionConfig, 'triggered' | 'message'>[] = [
  {
    id: 'services',
    context: 'Web dev, cloud, APIs, security & UI/UX services',
    triggerTime: 5000,
  },
  {
    id: 'about',
    context: 'Full-stack dev with 3+ years experience',
    triggerTime: 6000,
  },
  {
    id: 'experience',
    context: 'Worked at Stevo Digital & Micro QQ Tech',
    triggerTime: 7000,
  },
  {
    id: 'projects',
    context: 'Tasky, Prellia, AI tools & more',
    triggerTime: 8000,
  },
  { id: 'booking', context: 'Schedule a 30-min call', triggerTime: 5000 },
];

const FALLBACK_MESSAGES: Record<string, string> = {
  services: "Need help with any of these? Let's talk →",
  about: "Want to know if I'm the right fit?",
  experience: "Impressed? Let's discuss your project",
  projects: 'Want something similar for your business?',
  booking: 'Ready to start? Slots available this week ✓',
};

function MobileAssistant({ onBookCall }: { onBookCall: () => void }) {
  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] md:hidden flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full shadow-lg"
      onClick={onBookCall}
    >
      <span className="text-sm font-medium">Need help?</span>
    </motion.button>
  );
}

export function AmbientAI() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeBubble, setActiveBubble] = useState<SectionConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggeredSectionsRef = useRef<Set<string>>(new Set());
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const isInitializedRef = useRef(false);

  // Check mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle section trigger
  const triggerSection = useCallback((sectionId: string) => {
    const config = SECTION_CONFIGS.find((s) => s.id === sectionId);
    if (!config) return;

    setIsLoading(true);

    generateAmbientMessage(sectionId, config.context)
      .then((message) => {
        setActiveBubble({ ...config, triggered: true, message });
      })
      .catch(() => {
        setActiveBubble({
          ...config,
          triggered: true,
          message: FALLBACK_MESSAGES[sectionId],
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Scroll detection
  useEffect(() => {
    if (isMobile || isInitializedRef.current) return;
    isInitializedRef.current = true;

    const checkSections = () => {
      for (const section of SECTION_CONFIGS) {
        if (triggeredSectionsRef.current.has(section.id)) continue;

        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

        if (isVisible) {
          triggeredSectionsRef.current.add(section.id);

          const timerId = setTimeout(() => {
            triggerSection(section.id);
          }, section.triggerTime);

          timersRef.current.set(section.id, timerId);
        }
      }
    };

    setTimeout(checkSections, 1000);

    const handleScroll = () => checkSections();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, [isMobile, triggerSection]);

  const handleDismiss = () => setActiveBubble(null);

  const handleAction = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    handleDismiss();
  };

  if (isMobile) {
    return <MobileAssistant onBookCall={handleAction} />;
  }

  return (
    <>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-24 right-8 z-[9999]"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full text-sm text-white shadow-xl">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            Thinking...
          </div>
        </motion.div>
      )}

      {activeBubble && !isLoading && (
        <AmbientBubble
          message={activeBubble.message || ''}
          onDismiss={handleDismiss}
          onAction={handleAction}
        />
      )}
    </>
  );
}
