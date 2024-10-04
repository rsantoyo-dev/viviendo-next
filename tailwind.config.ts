import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors: modern and trustworthy
        primary: {
          DEFAULT: '#1D4ED8',     // Primary Blue
          light: '#3B82F6',       // Lighter Blue for hover or accents
          dark: '#1E3A8A',        // Dark Blue for more contrast or header
          contrast: '#FFFFFF',    // White for text on primary backgrounds
        },

        // Secondary colors: a fresh accent color
        secondary: {
          DEFAULT: '#34D399',     // Primary Teal (Refreshing & Modern)
          light: '#6EE7B7',       // Lighter Teal for hover or accents
          dark: '#059669',        // Dark Teal for more serious elements
          contrast: '#FFFFFF',    // White text for use on secondary backgrounds
        },

        // Tertiary colors: highlights and secondary elements
        tertiary: {
          DEFAULT: '#F59E0B',     // Warm Amber (Highlight Color)
          light: '#FCD34D',       // Lighter Amber
          dark: '#B45309',        // Dark Amber for shadowing or depth
          contrast: '#111827',    // Dark Gray for text on lighter tertiary backgrounds
        },

        // Neutral Backgrounds
        background: {
          light: '#F3F4F6',       // Light gray for a clean background
          dark: '#1F2937',        // Dark gray for dark mode or contrast sections
        },

        // Foreground (Text colors)
        foreground: {
          light: '#FFFFFF',       // White for text on dark backgrounds
          dark: '#111827',        // Dark gray for text on light backgrounds
        },
      },
    },
  },
  plugins: [],
};

export default config;
