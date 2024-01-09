import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-dark': '#191919',
        'secondary-dark': '#1b1d22',
        'secondary-light': '#F1F6F9',
      },
    },
  },
  plugins: [],
};
export default config;
