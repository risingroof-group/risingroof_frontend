'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function Drawer({ isOpen, onClose, title, children, side = 'right', className }: DrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const slideVariants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: { x: '0%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col',
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-slate-100 transition-colors ml-auto"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
