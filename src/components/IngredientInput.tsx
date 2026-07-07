import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

interface IngredientInputProps {
  pantry: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

export function IngredientInput({ pantry, onAdd, onRemove }: IngredientInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an ingredient and press enter..."
          className="w-full bg-transparent text-white text-lg placeholder:text-muted/60 border-b border-white/[0.08] focus:border-accent-mint/40 pb-4 pr-12 outline-none transition-all duration-500 ease-apple"
        />
        <button
          type="submit"
          className="absolute right-0 bottom-4 text-muted hover:text-accent-mint transition-colors duration-300"
        >
          <Plus size={24} />
        </button>
      </form>

      <div className="flex flex-wrap gap-3 mt-8 min-h-[3rem]">
        <AnimatePresence mode="popLayout">
          {pantry.map((item) => (
            <motion.button
              key={item}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={() => onRemove(item)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
            >
              <span className="text-sm text-white capitalize">{item}</span>
              <X
                size={14}
                className="text-muted group-hover:text-white transition-colors duration-300"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
