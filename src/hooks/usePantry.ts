import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePantry() {
  const { user } = useAuth();
  const [pantry, setPantry] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPantry([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('user_pantry')
          .select('ingredient_name')
          .order('created_at');

        if (error) throw error;
        if (!cancelled) {
          setPantry((data ?? []).map((r) => r.ingredient_name));
        }
      } catch {
        if (!cancelled) setPantry([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const addIngredient = useCallback(
    async (name: string) => {
      const normalized = name.trim().toLowerCase();
      if (!normalized || pantry.includes(normalized) || !user) return;

      setPantry((prev) => [...prev, normalized]);

      try {
        await supabase.from('user_pantry').insert({ ingredient_name: normalized });
      } catch {
        setPantry((prev) => prev.filter((i) => i !== normalized));
      }
    },
    [pantry, user],
  );

  const removeIngredient = useCallback(
    async (name: string) => {
      if (!user) return;
      setPantry((prev) => prev.filter((i) => i !== name));

      try {
        await supabase
          .from('user_pantry')
          .delete()
          .eq('ingredient_name', name);
      } catch {
        setPantry((prev) => [...prev, name]);
      }
    },
    [user],
  );

  const clearPantry = useCallback(async () => {
    if (!user) return;
    setPantry([]);

    try {
      await supabase.from('user_pantry').delete().eq('user_id', user.id);
    } catch {
      /* best effort */
    }
  }, [user]);

  return { pantry, loading, addIngredient, removeIngredient, clearPantry };
}
