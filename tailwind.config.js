/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          950: '#050709',
          900: '#08090B',
          850: '#0D1015',
          800: '#101216',
          700: '#14171C',
          600: '#1D222A',
          500: '#2A323D',
        },
        emerald: {
          glow: '#00F5A0',
          dim: '#00C97F',
          dark: '#00472E',
        },
        cyber: {
          cyan: '#00B8D9',
          amber: '#FFB830',
          crimson: '#FF3C5F',
          muted: '#9298A1',
          silver: '#C5CBD3',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-active': 'rgba(0, 245, 160, 0.35)',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['"Share Tech Mono"', '"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 245, 160, 0.15)',
        'glow-md': '0 0 30px rgba(0, 245, 160, 0.25)',
        'glow-lg': '0 0 50px rgba(0, 245, 160, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
