import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('recipe_id')
          .order('created_at');

        if (error) throw error;
        if (!cancelled) {
          setFavorites((data ?? []).map((r) => r.recipe_id));
        }
      } catch {
        if (!cancelled) setFavorites([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggleFavorite = useCallback(
    async (recipeId: string) => {
      if (!user) return;
      const isFav = favorites.includes(recipeId);

      if (isFav) {
        setFavorites((prev) => prev.filter((id) => id !== recipeId));
        try {
          await supabase
            .from('user_favorites')
            .delete()
            .eq('recipe_id', recipeId);
        } catch {
          setFavorites((prev) => [...prev, recipeId]);
        }
      } else {
        setFavorites((prev) => [...prev, recipeId]);
        try {
          await supabase.from('user_favorites').insert({ recipe_id: recipeId });
        } catch {
          setFavorites((prev) => prev.filter((id) => id !== recipeId));
        }
      }
    },
    [favorites, user],
  );

  return { favorites, loading, toggleFavorite };
}
