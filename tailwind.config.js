/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
        poppins: ['var(--font-poppins)'],
        josefin: ['var(--font-josefin-slab)']
      },
      colors: {
        primary: '#F7F3CE',
        secondary: '#7FB4BA',
        tertiary: '#04B0C4',
        black: '#000',
        white: '#fff',
        oldPrimary: '#1C6CA7',
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#BF8970',
        grey: '#808080',
        lightblue: '#CCDFEF',
        darkblue: '#003d7e',
        txt: '#1e1e1e'
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light']
  }
};
