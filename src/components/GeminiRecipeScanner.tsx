import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Loader2, Sparkles, X, AlertCircle } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface GeminiRecipeScannerProps {
  onRecipeGenerated: (recipe: Recipe) => void;
}

type ScanState = 'idle' | 'uploading' | 'analyzing' | 'error';

export function GeminiRecipeScanner({ onRecipeGenerated }: GeminiRecipeScannerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const processImage = async (file: File) => {
    setScanState('uploading');
    setErrorMsg('');

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);

      try {
        const base64Match = dataUrl.match(/^data:(.+?);base64,(.*)$/);
        if (!base64Match) {
          setScanState('error');
          setErrorMsg('Failed to read image data.');
          return;
        }

        const mimeType = base64Match[1];
        const base64Data = base64Match[2];

        setScanState('analyzing');

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

        const response = await fetch(`${supabaseUrl}/functions/v1/gemini-recipe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
          body: JSON.stringify({ imageBase64: base64Data, mimeType }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Request failed (${response.status})`);
        }

        const data = await response.json();

        if (data.error) {
          setScanState('error');
          setErrorMsg(data.error);
          return;
        }

        const recipe = data.recipe as Recipe;
        if (!recipe.name || !recipe.ingredients) {
          setScanState('error');
          setErrorMsg('Invalid recipe data received from AI.');
          return;
        }

        const generatedRecipe: Recipe = {
          id: `gemini-${Date.now()}`,
          name: recipe.name,
          image: dataUrl,
          prepTime: recipe.prepTime ?? 30,
          dietaryTags: recipe.dietaryTags ?? [],
          ingredients: recipe.ingredients ?? [],
          steps: recipe.steps ?? [],
          macros: recipe.macros ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
        };

        onRecipeGenerated(generatedRecipe);
        setScanState('idle');
        setPreview(null);
      } catch (err) {
        setScanState('error');
        setErrorMsg(err instanceof Error ? err.message : 'Failed to analyze image.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
    e.target.value = '';
  };

  const reset = () => {
    setScanState('idle');
    setPreview(null);
    setErrorMsg('');
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={20} className="text-accent-mint" />
        <h3 className="text-lg font-semibold tracking-tight text-white">
          AI Recipe Scanner
        </h3>
      </div>

      <p className="text-sm text-muted mb-6 leading-relaxed">
        Snap a photo of your ingredients and let Gemini AI craft a gourmet recipe
        just for you.
      </p>

      <AnimatePresence mode="wait">
        {scanState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl glass text-white text-sm font-medium transition-all duration-500 ease-apple hover:bg-white/[0.06]"
            >
              <Camera size={18} />
              Take Photo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl glass text-white text-sm font-medium transition-all duration-500 ease-apple hover:bg-white/[0.06]"
            >
              <Upload size={18} />
              Upload Image
            </motion.button>
          </motion.div>
        )}

        {(scanState === 'uploading' || scanState === 'analyzing') && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-8 flex flex-col items-center gap-4"
          >
            {preview && (
              <img
                src={preview}
                alt="Captured ingredients"
                className="w-32 h-32 object-cover rounded-2xl"
              />
            )}
            <div className="flex items-center gap-3 text-white">
              <Loader2 size={20} className="animate-spin text-accent-mint" />
              <span className="text-sm">
                {scanState === 'uploading'
                  ? 'Processing image...'
                  : 'Gemini AI is analyzing your ingredients...'}
              </span>
            </div>
          </motion.div>
        )}

        {scanState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-6 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm">{errorMsg}</span>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted hover:text-white transition-colors duration-300"
            >
              <X size={16} />
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
