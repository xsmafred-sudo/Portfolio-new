'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AmbientBubbleProps {
  message: string;
  onDismiss: () => void;
  onAction: () => void;
  position?: 'left' | 'right';
}

export function AmbientBubble({
  message,
  onDismiss,
  onAction,
  position = 'right',
}: AmbientBubbleProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after 15 seconds (longer for users to read)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed bottom-24 sm:bottom-28 z-[9998] ${
          position === 'right' ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
        }`}
      >
        <div className="relative">
          {/* Thought bubble tail */}
          <div
            className={`absolute -bottom-2 ${
              position === 'right' ? 'right-6' : 'left-6'
            } w-4 h-4 bg-white dark:bg-zinc-800 rotate-45 rounded-sm`}
          />

          {/* Main bubble */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 pr-10 max-w-[280px]">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3 text-zinc-400" />
            </button>

            <p className="text-sm text-zinc-700 dark:text-zinc-200 font-medium leading-snug">
              {message}
            </p>

            <button
              onClick={onAction}
              className="mt-3 flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:gap-2 transition-all"
            >
              Book a call
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
