/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        cosmic: {
          50: 'oklch(0.97 0.01 280)',
          100: 'oklch(0.93 0.02 280)',
          200: 'oklch(0.85 0.04 280)',
          300: 'oklch(0.72 0.06 280)',
          400: 'oklch(0.58 0.08 280)',
          500: 'oklch(0.45 0.08 280)',
          600: 'oklch(0.35 0.07 280)',
          700: 'oklch(0.27 0.06 280)',
          800: 'oklch(0.20 0.05 280)',
          900: 'oklch(0.14 0.04 280)',
          950: 'oklch(0.09 0.03 280)',
        },
        gold: {
          50: 'oklch(0.98 0.02 85)',
          100: 'oklch(0.95 0.05 85)',
          200: 'oklch(0.90 0.10 85)',
          300: 'oklch(0.84 0.15 85)',
          400: 'oklch(0.78 0.18 85)',
          500: 'oklch(0.70 0.18 75)',
          600: 'oklch(0.60 0.17 70)',
          700: 'oklch(0.50 0.15 68)',
          800: 'oklch(0.40 0.12 65)',
          900: 'oklch(0.30 0.09 65)',
          950: 'oklch(0.20 0.06 65)',
        },
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring))',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary))',
          foreground: 'oklch(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary))',
          foreground: 'oklch(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive))',
          foreground: 'oklch(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted))',
          foreground: 'oklch(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent))',
          foreground: 'oklch(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))',
        },
      },
      boxShadow: {
        gold: '0 0 20px oklch(0.70 0.18 75 / 0.3), 0 4px 12px oklch(0.70 0.18 75 / 0.2)',
        'gold-lg': '0 0 40px oklch(0.70 0.18 75 / 0.4), 0 8px 24px oklch(0.70 0.18 75 / 0.3)',
        'gold-sm': '0 0 10px oklch(0.70 0.18 75 / 0.2)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'whatsapp-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'whatsapp-ring': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-10deg)' },
          '20%, 40%, 60%, 80%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        'whatsapp-pulse': 'whatsapp-pulse 2s ease-out infinite',
        'whatsapp-ring': 'whatsapp-ring 1s ease-in-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
