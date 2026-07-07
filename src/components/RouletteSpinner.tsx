import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface RouletteSpinnerProps {
  recipes: Recipe[];
  pantrySize: number;
  onSpin: () => void;
  spinning: boolean;
}

export function RouletteSpinner({
  recipes,
  pantrySize,
  onSpin,
  spinning,
}: RouletteSpinnerProps) {
  const [displayedName, setDisplayedName] = useState<string>('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (spinning && recipes.length > 0) {
      let i = 0;
      intervalRef.current = setInterval(() => {
        setDisplayedName(recipes[i % recipes.length].name);
        i++;
      }, 80);

      const timeout = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayedName('');
      }, 1500);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(timeout);
      };
    }
  }, [spinning, recipes]);

  const disabled = pantrySize === 0;

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatePresence mode="wait">
        {spinning && displayedName && (
          <motion.p
            key={displayedName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.06 }}
            className="text-muted text-lg text-center tracking-tight h-7"
          >
            {displayedName}
          </motion.p>
        )}
        {!spinning && !displayedName && (
          <motion.p
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted text-base text-center h-7"
          >
            {disabled ? 'Add ingredients to your pantry' : 'Ready to spin'}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={disabled ? undefined : onSpin}
        disabled={disabled || spinning}
        className={`relative flex items-center justify-center gap-3 px-16 py-6 rounded-full text-lg font-semibold tracking-tight transition-all duration-500 ${
          disabled
            ? 'bg-white/[0.03] border border-white/[0.05] text-white/20 cursor-not-allowed'
            : 'bg-white text-black hover:bg-white/90 cursor-pointer'
        }`}
      >
        <motion.div
          animate={spinning ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8, ease: 'linear', repeat: spinning ? Infinity : 0 }}
        >
          <Shuffle size={22} />
        </motion.div>
        <span>{spinning ? 'Finding Matches...' : 'Spin the Roulette'}</span>
      </motion.button>
    </div>
  );
}
