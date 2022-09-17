/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./colors');

module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],
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
      },
      lineHeight: {
        base: '30px',
      },
      fontSize: {
        lg: '17px',
        sm: '13px',
        xs: '11px',
      },
      colors,
    },
  },
  plugins: [],
};
