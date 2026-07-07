import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MainHeaderProps {
  dietaryFilter: string | null;
  onDietaryFilterChange: (filter: string | null) => void;
  dietaryTags: string[];
}

export function MainHeader({
  dietaryFilter,
  onDietaryFilterChange,
  dietaryTags,
}: MainHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 bg-black/60 backdrop-blur-md z-50 border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Recipe<span className="text-accent-mint">Roulette</span>
        </h1>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors duration-300"
            >
              {dietaryFilter ?? 'All Recipes'}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute right-0 top-full mt-2 glass rounded-2xl py-2 min-w-[180px]"
                >
                  <button
                    onClick={() => {
                      onDietaryFilterChange(null);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-muted hover:text-white transition-colors duration-200"
                  >
                    All Recipes
                  </button>
                  {dietaryTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        onDietaryFilterChange(tag);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        dietaryFilter === tag
                          ? 'text-accent-mint'
                          : 'text-muted hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            {user?.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <button
              onClick={signOut}
              className="text-muted hover:text-white transition-colors duration-300"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
