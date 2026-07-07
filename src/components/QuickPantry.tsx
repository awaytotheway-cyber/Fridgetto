import { motion } from 'framer-motion';
import { QUICK_PANTRY_ITEMS } from '../data/pantry';

interface QuickPantryProps {
  pantry: string[];
  onToggle: (name: string) => void;
}

export function QuickPantry({ pantry, onToggle }: QuickPantryProps) {
  return (
    <div className="w-full">
      <p className="text-sm text-muted mb-6 tracking-wide">Quick Pantry</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {QUICK_PANTRY_ITEMS.map((item, index) => {
          const selected = pantry.includes(item);
          return (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.02,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onToggle(item)}
              className={`px-4 py-3 rounded-2xl text-sm capitalize transition-all duration-500 ease-apple border ${
                selected
                  ? 'border-accent-mint/30 bg-accent-mint/[0.06] text-white'
                  : 'border-white/[0.06] bg-white/[0.01] text-muted hover:text-white hover:border-white/10'
              }`}
            >
              {item}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
