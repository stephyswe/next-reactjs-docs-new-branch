/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./colors');

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    // Override base screen sizes
    screens: {
      ...defaultTheme.screens,
      betterhover: {raw: '(hover: hover)'},
    },
    extend: {
      fontFamily: {
        sans: [
          'Optimistic Display',
          '-apple-system',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        base: '30px',
      },
      fontSize: {
        lg: '17px',
        base: '15px',
        sm: '13px',
        xs: '11px',
      },
      colors,
      gridTemplateColumns: {
        'sidebar-content': '20rem auto',
        'sidebar-content-toc': '20rem auto 20rem',
      },
    },
  },
  plugins: [],
};
