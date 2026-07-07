import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { MainHeader } from './components/MainHeader';
import { IngredientInput } from './components/IngredientInput';
import { QuickPantry } from './components/QuickPantry';
import { RouletteSpinner } from './components/RouletteSpinner';
import { RecipeDeck } from './components/RecipeDeck';
import { ActiveKitchenView } from './components/ActiveKitchenView';
import { GeminiRecipeScanner } from './components/GeminiRecipeScanner';
import { useRecipes } from './hooks/useRecipes';
import { usePantry } from './hooks/usePantry';
import { useFavorites } from './hooks/useFavorites';
import { matchRecipes } from './lib/matchRecipes';
import type { Recipe, RecipeMatch } from './types/recipe';

function AppContent() {
  const { user, loading } = useAuth();
  const { recipes, loading: recipesLoading } = useRecipes();
  const { pantry, addIngredient, removeIngredient } = usePantry();
  const { favorites, toggleFavorite } = useFavorites();

  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [matches, setMatches] = useState<RecipeMatch[]>([]);
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);
  const [geminiRecipes, setGeminiRecipes] = useState<Recipe[]>([]);

  const allRecipes = useMemo(() => [...recipes, ...geminiRecipes], [recipes, geminiRecipes]);

  const dietaryTags = useMemo(() => {
    const tags = new Set<string>();
    allRecipes.forEach((r) => (r.dietaryTags ?? []).forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [allRecipes]);

  const activeRecipe = useMemo(
    () => allRecipes.find((r) => r.id === activeRecipeId) ?? null,
    [allRecipes, activeRecipeId],
  );

  const handleSpin = () => {
    setSpinning(true);
    setMatches([]);

    setTimeout(() => {
      const results = matchRecipes(pantry, allRecipes, dietaryFilter);
      setMatches(results);
      setSpinning(false);
    }, 1500);
  };

  const handlePantryToggle = (name: string) => {
    if (pantry.includes(name)) {
      removeIngredient(name);
    } else {
      addIngredient(name);
    }
  };

  const handleGeminiRecipe = (recipe: Recipe) => {
    setGeminiRecipes((prev) => [recipe, ...prev]);
    setActiveRecipeId(recipe.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted text-lg tracking-tight"
        >
          RecipeRoulette
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (activeRecipe) {
    return (
      <div className="min-h-screen bg-black">
        <MainHeader
          dietaryFilter={dietaryFilter}
          onDietaryFilterChange={setDietaryFilter}
          dietaryTags={dietaryTags}
        />
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">
          <AnimatePresence mode="wait">
            <ActiveKitchenView
              key={activeRecipe.id}
              recipe={activeRecipe}
              onBack={() => setActiveRecipeId(null)}
            />
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <MainHeader
        dietaryFilter={dietaryFilter}
        onDietaryFilterChange={setDietaryFilter}
        dietaryTags={dietaryTags}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="py-24 md:py-32"
        >
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight text-gradient mb-6"
            >
              What's in your kitchen?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
            >
              Add the ingredients you have on hand. We'll find gourmet recipes
              you can make right now.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <IngredientInput
              pantry={pantry}
              onAdd={addIngredient}
              onRemove={removeIngredient}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-5xl mx-auto mt-16"
          >
            <QuickPantry pantry={pantry} onToggle={handlePantryToggle} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-3xl mx-auto mt-16"
          >
            <div className="glass rounded-3xl p-8">
              <GeminiRecipeScanner onRecipeGenerated={handleGeminiRecipe} />
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="py-16 md:py-24"
        >
          <RouletteSpinner
            recipes={allRecipes}
            pantrySize={pantry.length}
            onSpin={handleSpin}
            spinning={spinning}
          />
        </motion.section>

        <AnimatePresence>
          {matches.length > 0 && !spinning && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="py-16 md:py-24"
            >
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-gradient mb-12 text-center">
                Your Matches
              </h3>
              <RecipeDeck
                matches={matches}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onLaunchKitchen={(id) => setActiveRecipeId(id)}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {!recipesLoading && matches.length === 0 && !spinning && pantry.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted text-lg">
              Hit "Spin the Roulette" to discover recipes.
            </p>
          </motion.div>
        )}

        <footer className="py-16 text-center">
          <p className="text-sm text-muted/50">
            RecipeRoulette — Gourmet cooking, simplified.
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
