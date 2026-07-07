/*
# Create recipes table (public catalog)

1. Purpose
   - Stores the gourmet recipe catalog for RecipeRoulette.
   - This is a public, shared catalog readable by all users (authenticated and anon).
   - Recipes are seeded from the local recipes.json file on first load.

2. New Tables
   - `recipes`
     - `id` (text, primary key) — unique recipe identifier (e.g. "truffle-mushroom-risotto")
     - `name` (text, not null) — display name of the recipe
     - `image` (text, not null) — URL to high-res culinary photography
     - `prep_time` (integer, not null) — preparation time in minutes
     - `dietary_tags` (text[], default empty array) — tags like "Vegan", "Keto", "Gluten-Free"
     - `ingredients` (jsonb, not null) — array of {name, amount} objects
     - `steps` (jsonb, not null) — array of {instruction, durationSeconds?} objects
     - `macros` (jsonb, not null) — {calories, protein, carbs, fat} object
     - `created_at` (timestamptz, default now())

3. Security
   - Enable RLS on `recipes`.
   - SELECT is public: `TO anon, authenticated` with `USING (true)` — the recipe catalog is intentionally shared/public.
   - No INSERT/UPDATE/DELETE policies — recipes are managed via migrations, not from the frontend.

4. Important Notes
   - The recipe catalog is read-only from the frontend. All writes happen through migrations.
   - The `USING (true)` on SELECT is intentional because this is a public catalog, not user-owned data.
*/

CREATE TABLE IF NOT EXISTS recipes (
  id text PRIMARY KEY,
  name text NOT NULL,
  image text NOT NULL,
  prep_time integer NOT NULL,
  dietary_tags text[] NOT NULL DEFAULT '{}',
  ingredients jsonb NOT NULL,
  steps jsonb NOT NULL,
  macros jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_recipes" ON recipes;
CREATE POLICY "public_read_recipes"
ON recipes FOR SELECT
TO anon, authenticated
USING (true);
