import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Recipe } from '../types/recipe';
import localRecipes from '../data/recipes.json';

interface RecipeRow {
  id: string;
  name: string;
  image: string;
  prep_time: number;
  dietary_tags: string[] | null;
  ingredients: Recipe['ingredients'];
  steps: Recipe['steps'];
  macros: Recipe['macros'];
}

function mapRowToRecipe(row: RecipeRow): Recipe {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    prepTime: row.prep_time,
    dietaryTags: row.dietary_tags ?? [],
    ingredients: row.ingredients ?? [],
    steps: row.steps ?? [],
    macros: row.macros ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
  };
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('name');

        if (error) throw error;

        if (!cancelled && data && data.length > 0) {
          setRecipes((data as RecipeRow[]).map(mapRowToRecipe));
        } else if (!cancelled) {
          setRecipes(localRecipes as Recipe[]);
        }
      } catch {
        if (!cancelled) {
          setRecipes(localRecipes as Recipe[]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { recipes, loading };
}
