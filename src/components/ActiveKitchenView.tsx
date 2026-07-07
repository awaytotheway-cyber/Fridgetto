import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Flame } from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { PrepChecklist } from './PrepChecklist';
import { CookingSteps } from './CookingSteps';
import { MacroAnalytics } from './MacroAnalytics';

interface ActiveKitchenViewProps {
  recipe: Recipe;
  onBack: () => void;
}

export function ActiveKitchenView({ recipe, onBack }: ActiveKitchenViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted hover:text-white transition-colors duration-300 mb-12"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back to Roulette</span>
      </button>

      <div className="mb-12">
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex gap-2 mb-3">
              {recipe.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/60 bg-white/[0.08] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
              {recipe.name}
            </h2>
            <div className="flex items-center gap-6 mt-3 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Clock size={16} />
                {recipe.prepTime} minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Flame size={16} />
                {recipe.macros.calories} calories
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PrepChecklist recipe={recipe} />
          <div className="mt-6">
            <MacroAnalytics recipe={recipe} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <CookingSteps recipe={recipe} />
        </div>
      </div>
    </motion.div>
  );
}
