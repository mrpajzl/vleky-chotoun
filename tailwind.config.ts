import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#FF6B35',
        'alpine-blue': '#1B4965',
        'golden-hour': '#FFD23F',
        'snow-cream': '#F7F4ED',
        'mountain-night': '#2D3047',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Crimson Pro"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'diagonal-gradient': 'linear-gradient(135deg, hsl(18, 57%, 60%), hsl(45, 100%, 62%))',
        'alpine-gradient': 'linear-gradient(180deg, hsl(204, 48%, 24%) 0%, hsl(232, 20%, 23%) 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-live': 'pulse-live 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
