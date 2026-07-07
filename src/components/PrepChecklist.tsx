import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { useCookingProgress } from '../hooks/useCookingProgress';

interface PrepChecklistProps {
  recipe: Recipe;
}

export function PrepChecklist({ recipe }: PrepChecklistProps) {
  const { progress, toggleIngredient } = useCookingProgress(recipe.id);

  return (
    <div className="glass rounded-3xl p-8">
      <h3 className="text-lg font-semibold tracking-tight text-white mb-6">
        Prep Checklist
      </h3>
      <div className="space-y-3">
        {recipe.ingredients.map((ing, index) => {
          const checked = progress.checkedIngredients.includes(ing.name);
          return (
            <motion.button
              key={ing.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => toggleIngredient(ing.name)}
              className="w-full flex items-center gap-4 py-2 group"
            >
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  checked
                    ? 'bg-accent-mint/20 border-accent-mint'
                    : 'border-white/15 group-hover:border-white/30'
                }`}
              >
                {checked && <Check size={14} className="text-accent-mint" />}
              </div>
              <div className="flex items-baseline gap-2 flex-1 min-w-0">
                <span
                  className={`text-sm capitalize transition-all duration-300 ${
                    checked ? 'text-white/30 line-through' : 'text-white/80'
                  }`}
                >
                  {ing.name}
                </span>
                <span
                  className={`text-xs shrink-0 transition-all duration-300 ${
                    checked ? 'text-white/20' : 'text-muted'
                  }`}
                >
                  {ing.amount}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
