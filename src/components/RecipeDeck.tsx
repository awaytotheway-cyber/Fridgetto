import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, Heart, CheckCircle, Flame } from 'lucide-react';
import type { RecipeMatch } from '../types/recipe';

interface RecipeDeckProps {
  matches: RecipeMatch[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onLaunchKitchen: (recipeId: string) => void;
}

export function RecipeDeck({
  matches,
  favorites,
  onToggleFavorite,
  onLaunchKitchen,
}: RecipeDeckProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (matches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {matches.map((match, index) => (
        <RecipeCard
          key={match.recipe.id}
          match={match}
          index={index}
          isFavorite={favorites.includes(match.recipe.id)}
          isExpanded={expanded === match.recipe.id}
          onExpand={() =>
            setExpanded((prev) =>
              prev === match.recipe.id ? null : match.recipe.id,
            )
          }
          onToggleFavorite={() => onToggleFavorite(match.recipe.id)}
          onLaunch={() => onLaunchKitchen(match.recipe.id)}
        />
      ))}
    </motion.div>
  );
}

interface RecipeCardProps {
  match: RecipeMatch;
  index: number;
  isFavorite: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onToggleFavorite: () => void;
  onLaunch: () => void;
}

function RecipeCard({
  match,
  index,
  isFavorite,
  isExpanded,
  onExpand,
  onToggleFavorite,
  onLaunch,
}: RecipeCardProps) {
  const { recipe, tier, missingIngredients, matchPercentage } = match;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="glass rounded-3xl overflow-hidden group"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              tier === 'perfect'
                ? 'bg-accent-mint/20 text-accent-mint border border-accent-mint/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {tier === 'perfect' ? 'Perfect Match' : 'Close Match'}
          </span>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={onToggleFavorite}
            className="w-8 h-8 glass rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          >
            <Heart
              size={16}
              className={
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white/60'
              }
            />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex gap-1 flex-wrap mb-2">
              {recipe.dietaryTags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-white font-semibold text-xl tracking-tight leading-tight">
              {recipe.name}
            </h3>
          </div>
          <div className="text-right shrink-0 ml-3">
            <span className="text-2xl font-semibold tabular-nums text-gradient-mint">
              {matchPercentage}%
            </span>
            <p className="text-xs text-muted">match</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {recipe.prepTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame size={14} />
              {recipe.macros.calories} cal
            </span>
          </div>
          <button
            onClick={onExpand}
            className="text-muted hover:text-white transition-colors duration-300"
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-xs text-muted uppercase tracking-widest mb-3">
                  Ingredients
                </p>
                <div className="grid grid-cols-2 gap-1 mb-4">
                  {recipe.ingredients.map((ing) => {
                    const isMissing = missingIngredients.some((m) =>
                      m.toLowerCase().includes(ing.name.toLowerCase()),
                    );
                    return (
                      <div key={ing.name} className="flex items-center gap-2">
                        {isMissing ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 shrink-0" />
                        ) : (
                          <CheckCircle
                            size={12}
                            className="text-accent-mint shrink-0"
                          />
                        )}
                        <span
                          className={`text-xs capitalize ${isMissing ? 'text-white/30' : 'text-white/70'}`}
                        >
                          {ing.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {missingIngredients.length > 0 && (
                  <p className="text-xs text-muted/60 mb-5">
                    Missing{' '}
                    <span className="text-amber-400">
                      {missingIngredients.join(', ')}
                    </span>
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={onLaunch}
                  className="w-full py-3 rounded-2xl bg-white text-black text-sm font-semibold transition-all duration-300 hover:bg-white/90"
                >
                  Start Cooking
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
