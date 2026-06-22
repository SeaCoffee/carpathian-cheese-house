import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        cheese: {
          50: 'hsl(40, 100%, 97%)',
          100: 'hsl(40, 100%, 94%)',
          200: 'hsl(39, 65%, 91%)',
          300: 'hsl(38, 60%, 85%)',
          400: 'hsl(38, 68%, 70%)',
          500: 'hsl(38, 68%, 55%)',
          600: 'hsl(35, 60%, 45%)',
          700: 'hsl(30, 50%, 40%)',
          800: 'hsl(25, 40%, 30%)',
          900: 'hsl(22, 35%, 20%)',
        },
        forest: {
          50: 'hsl(136, 30%, 94%)',
          100: 'hsl(136, 30%, 88%)',
          200: 'hsl(136, 30%, 78%)',
          300: 'hsl(136, 30%, 65%)',
          400: 'hsl(136, 33%, 45%)',
          500: 'hsl(136, 33%, 35%)',
          600: 'hsl(136, 33%, 27%)',
          700: 'hsl(136, 35%, 22%)',
          800: 'hsl(136, 40%, 17%)',
          900: 'hsl(136, 45%, 12%)',
        },
        terracotta: {
          50: 'hsl(22, 60%, 92%)',
          100: 'hsl(22, 55%, 85%)',
          200: 'hsl(22, 50%, 75%)',
          300: 'hsl(22, 51%, 60%)',
          400: 'hsl(22, 51%, 50%)',
          500: 'hsl(22, 51%, 44%)',
          600: 'hsl(22, 50%, 38%)',
          700: 'hsl(22, 50%, 32%)',
          800: 'hsl(22, 50%, 25%)',
          900: 'hsl(22, 50%, 18%)',
        },
        brown: {
          50: 'hsl(28, 40%, 92%)',
          100: 'hsl(28, 35%, 85%)',
          200: 'hsl(28, 35%, 72%)',
          300: 'hsl(28, 34%, 55%)',
          400: 'hsl(28, 34%, 42%)',
          500: 'hsl(28, 34%, 33%)',
          600: 'hsl(28, 30%, 27%)',
          700: 'hsl(22, 27%, 20%)',
          800: 'hsl(22, 27%, 15%)',
          900: 'hsl(22, 27%, 10%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
