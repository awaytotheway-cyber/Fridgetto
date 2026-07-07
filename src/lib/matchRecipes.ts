import type { Recipe, RecipeMatch } from '../types/recipe';

export function matchRecipes(
  pantry: string[],
  recipes: Recipe[],
  dietaryFilter: string | null,
): RecipeMatch[] {
  const normalizedPantry = new Set(pantry.map((p) => p.toLowerCase().trim()));

  const filtered = dietaryFilter
    ? recipes.filter((r) => r.dietaryTags.includes(dietaryFilter))
    : recipes;

  if (normalizedPantry.size === 0) return [];

  const matches: RecipeMatch[] = filtered.map((recipe) => {
    const recipeIngredients = recipe.ingredients.map((ing) =>
      ing.name.toLowerCase().trim(),
    );

    const matched = recipeIngredients.filter((ing) =>
      Array.from(normalizedPantry).some(
        (p) => ing.includes(p) || p.includes(ing),
      ),
    );

    const missing = recipeIngredients.filter(
      (ing) =>
        !Array.from(normalizedPantry).some(
          (p) => ing.includes(p) || p.includes(ing),
        ),
    );

    const matchPercentage = Math.round(
      (matched.length / recipeIngredients.length) * 100,
    );

    return {
      recipe,
      tier: (missing.length === 0 ? 'perfect' : 'close') as 'perfect' | 'close',
      missingIngredients: missing,
      matchPercentage,
    };
  });

  const perfectMatches = matches
    .filter((m) => m.tier === 'perfect')
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const closeMatches = matches
    .filter((m) => m.tier === 'close' && m.matchPercentage >= 50)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const result: RecipeMatch[] = [...perfectMatches];

  if (result.length === 0 && closeMatches.length > 0) {
    result.push(closeMatches[0]);
  } else if (result.length < 3 && closeMatches.length > 0) {
    result.push(closeMatches[0]);
  }

  return result.slice(0, 3);
}
