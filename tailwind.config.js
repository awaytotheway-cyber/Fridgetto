/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#000000',
        slate: {
          deep: '#050506',
          card: '#0a0a0c',
        },
        accent: {
          mint: '#00ffb3',
          emerald: '#34c759',
        },
        muted: '#86868b',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          '"Roboto Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'pulse-mint': 'pulseMint 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseMint: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 179, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 255, 179, 0)' },
        },
      },
    },
  },
  plugins: [],
};
