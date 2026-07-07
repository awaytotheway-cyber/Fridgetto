/*
# Create user-scoped tables: pantry, favorites, cooking progress

1. Purpose
   - Stores per-user data for RecipeRoulette: selected pantry ingredients,
     favorited recipes, and in-progress cooking state.
   - All tables are owner-scoped: each row belongs to one authenticated user,
     enforced by RLS policies using auth.uid().

2. New Tables
   - `user_pantry`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users ON DELETE CASCADE)
     - `ingredient_name` (text, not null) — normalized ingredient name the user has selected
     - `created_at` (timestamptz, default now())
     - Unique constraint on (user_id, ingredient_name) to prevent duplicates

   - `user_favorites`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users ON DELETE CASCADE)
     - `recipe_id` (text, not null, references recipes(id) ON DELETE CASCADE)
     - `created_at` (timestamptz, default now())
     - Unique constraint on (user_id, recipe_id) to prevent duplicate favorites

   - `cooking_progress`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users ON DELETE CASCADE)
     - `recipe_id` (text, not null, references recipes(id) ON DELETE CASCADE)
     - `checked_ingredients` (jsonb, default '[]') — array of ingredient names checked off in prep
     - `checked_steps` (jsonb, default '[]') — array of completed step indices
     - `updated_at` (timestamptz, default now())
     - Unique constraint on (user_id, recipe_id) — one progress record per user per recipe

3. Security
   - Enable RLS on all three tables.
   - Each table has 4 owner-scoped policies (SELECT, INSERT, UPDATE, DELETE),
     all restricted to `TO authenticated` with `auth.uid() = user_id`.
   - The `DEFAULT auth.uid()` on `user_id` ensures inserts that omit user_id
     still satisfy the WITH CHECK constraint.

4. Important Notes
   - These tables are ONLY accessible to authenticated users.
   - Unauthenticated (anon) users cannot read or write any of this data.
   - The frontend must build the full Google SSO auth flow so users can sign in
     before accessing pantry, favorites, or cooking progress.
*/

-- user_pantry
CREATE TABLE IF NOT EXISTS user_pantry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredient_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, ingredient_name)
);

ALTER TABLE user_pantry ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_pantry" ON user_pantry;
CREATE POLICY "select_own_pantry"
ON user_pantry FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_pantry" ON user_pantry;
CREATE POLICY "insert_own_pantry"
ON user_pantry FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_pantry" ON user_pantry;
CREATE POLICY "update_own_pantry"
ON user_pantry FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_pantry" ON user_pantry;
CREATE POLICY "delete_own_pantry"
ON user_pantry FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- user_favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id text NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, recipe_id)
);

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_favorites" ON user_favorites;
CREATE POLICY "select_own_favorites"
ON user_favorites FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_favorites" ON user_favorites;
CREATE POLICY "insert_own_favorites"
ON user_favorites FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_favorites" ON user_favorites;
CREATE POLICY "update_own_favorites"
ON user_favorites FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_favorites" ON user_favorites;
CREATE POLICY "delete_own_favorites"
ON user_favorites FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- cooking_progress
CREATE TABLE IF NOT EXISTS cooking_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id text NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  checked_ingredients jsonb NOT NULL DEFAULT '[]',
  checked_steps jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, recipe_id)
);

ALTER TABLE cooking_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_progress" ON cooking_progress;
CREATE POLICY "select_own_progress"
ON cooking_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_progress" ON cooking_progress;
CREATE POLICY "insert_own_progress"
ON cooking_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_progress" ON cooking_progress;
CREATE POLICY "update_own_progress"
ON cooking_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_progress" ON cooking_progress;
CREATE POLICY "delete_own_progress"
ON cooking_progress FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
