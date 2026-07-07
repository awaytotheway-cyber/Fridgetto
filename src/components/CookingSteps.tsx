import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { useCookingProgress } from '../hooks/useCookingProgress';

interface CookingStepsProps {
  recipe: Recipe;
}

export function CookingSteps({ recipe }: CookingStepsProps) {
  const { progress, toggleStep } = useCookingProgress(recipe.id);
  const [activeTimerIndex, setActiveTimerIndex] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            playBeep();
            setIsRunning(false);
            setActiveTimerIndex(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isRunning, remainingSeconds]);

  const playBeep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = 880;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      /* audio not available */
    }
  };

  const startTimer = (stepIndex: number, duration: number) => {
    setActiveTimerIndex(stepIndex);
    setRemainingSeconds(duration);
    setIsRunning(true);
  };

  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setActiveTimerIndex(null);
    setRemainingSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="glass rounded-3xl p-8">
      <h3 className="text-lg font-semibold tracking-tight text-white mb-6">
        Cooking Steps
      </h3>
      <div className="space-y-6">
        {recipe.steps.map((step, index) => {
          const checked = progress.checkedSteps.includes(index);
          const isTimerActive = activeTimerIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex gap-4"
            >
              <button
                onClick={() => toggleStep(index)}
                className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                  checked
                    ? 'bg-accent-mint/20 border-accent-mint'
                    : 'border-white/15 hover:border-white/30'
                }`}
              >
                {checked && <Check size={14} className="text-accent-mint" />}
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm leading-relaxed transition-all duration-300 ${
                    checked ? 'text-white/30' : 'text-white/80'
                  }`}
                >
                  <span className="text-muted mr-2 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step.instruction}
                </p>

                {step.durationSeconds && (
                  <div className="mt-4 flex items-center gap-4">
                    <AnimatePresence mode="wait">
                      {isTimerActive ? (
                        <motion.div
                          key="timer"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`text-3xl font-semibold tabular-nums tracking-tight transition-colors duration-300 ${
                              remainingSeconds <= 10 && remainingSeconds > 0
                                ? 'text-accent-mint'
                                : 'text-white'
                            }`}
                          >
                            {formatTime(remainingSeconds)}
                          </span>

                          <div className="flex gap-2">
                            <button
                              onClick={togglePause}
                              className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                            >
                              {isRunning ? (
                                <Pause size={16} className="text-white" />
                              ) : (
                                <Play size={16} className="text-white" />
                              )}
                            </button>
                            <button
                              onClick={resetTimer}
                              className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                            >
                              <RotateCcw size={16} className="text-white" />
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() =>
                            startTimer(index, step.durationSeconds!)
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                        >
                          <Play size={14} />
                          {formatTime(step.durationSeconds)}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
