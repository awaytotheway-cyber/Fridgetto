import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface CookingProgress {
  checkedIngredients: string[];
  checkedSteps: number[];
}

export function useCookingProgress(recipeId: string | null) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<CookingProgress>({
    checkedIngredients: [],
    checkedSteps: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !recipeId) {
      setProgress({ checkedIngredients: [], checkedSteps: [] });
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('cooking_progress')
          .select('checked_ingredients, checked_steps')
          .eq('recipe_id', recipeId)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled && data) {
          setProgress({
            checkedIngredients: data.checked_ingredients ?? [],
            checkedSteps: data.checked_steps ?? [],
          });
        } else if (!cancelled) {
          setProgress({ checkedIngredients: [], checkedSteps: [] });
        }
      } catch {
        if (!cancelled) setProgress({ checkedIngredients: [], checkedSteps: [] });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, recipeId]);

  const saveProgress = useCallback(
    async (next: CookingProgress) => {
      if (!user || !recipeId) return;
      try {
        await supabase
          .from('cooking_progress')
          .upsert(
            {
              recipe_id: recipeId,
              checked_ingredients: next.checkedIngredients,
              checked_steps: next.checkedSteps,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,recipe_id' },
          );
      } catch {
        /* best effort */
      }
    },
    [user, recipeId],
  );

  const toggleIngredient = useCallback(
    (name: string) => {
      setProgress((prev) => {
        const checked = prev.checkedIngredients.includes(name)
          ? prev.checkedIngredients.filter((n) => n !== name)
          : [...prev.checkedIngredients, name];
        const next = { ...prev, checkedIngredients: checked };
        saveProgress(next);
        return next;
      });
    },
    [saveProgress],
  );

  const toggleStep = useCallback(
    (index: number) => {
      setProgress((prev) => {
        const checked = prev.checkedSteps.includes(index)
          ? prev.checkedSteps.filter((i) => i !== index)
          : [...prev.checkedSteps, index];
        const next = { ...prev, checkedSteps: checked };
        saveProgress(next);
        return next;
      });
    },
    [saveProgress],
  );

  return { progress, loading, toggleIngredient, toggleStep };
}
