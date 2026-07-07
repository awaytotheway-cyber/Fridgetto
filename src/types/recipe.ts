export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface RecipeStep {
  instruction: string;
  durationSeconds?: number;
}

export interface RecipeMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: number;
  dietaryTags: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  macros: RecipeMacros;
}

export type MatchTier = 'perfect' | 'close';

export interface RecipeMatch {
  recipe: Recipe;
  tier: MatchTier;
  missingIngredients: string[];
  matchPercentage: number;
}
