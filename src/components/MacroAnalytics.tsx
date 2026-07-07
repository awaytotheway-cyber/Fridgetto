import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Recipe } from '../types/recipe';

interface MacroAnalyticsProps {
  recipe: Recipe;
}

const MACRO_COLORS = {
  protein: '#00ffb3',
  carbs: '#5e9eff',
  fat: '#ff9f40',
};

export function MacroAnalytics({ recipe }: MacroAnalyticsProps) {
  const { macros } = recipe;

  const data = [
    { name: 'Protein', value: macros.protein, color: MACRO_COLORS.protein },
    { name: 'Carbs', value: macros.carbs, color: MACRO_COLORS.carbs },
    { name: 'Fat', value: macros.fat, color: MACRO_COLORS.fat },
  ];

  const totalGrams = macros.protein + macros.carbs + macros.fat;

  return (
    <div className="glass rounded-3xl p-8">
      <h3 className="text-lg font-semibold tracking-tight text-white mb-6">
        Nutrition
      </h3>

      <div className="relative w-full h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-semibold tabular-nums text-white">
            {macros.calories}
          </span>
          <span className="text-xs text-muted uppercase tracking-widest">
            calories
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((macro) => (
          <div key={macro.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: macro.color }}
              />
              <span className="text-sm text-white/70">{macro.name}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium tabular-nums text-white">
                {macro.value}g
              </span>
              <span className="text-xs text-muted tabular-nums">
                {totalGrams > 0
                  ? Math.round((macro.value / totalGrams) * 100)
                  : 0}
                %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
