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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        black: 'var(--black)',
        white: 'var(--white)',
        oldPrimary: 'var(--oldPrimary)',
        gold: 'var(--gold)',
        silver: 'var(--silver)',
        bronze: 'var(--bronze)',
        grey: 'var(--grey)',
        lightblue: 'var(--lightblue)',
        darkblue: 'var(--darkblue)',
        txt: 'var(--txt)',
        bgColor: 'var(--bgColor)',
        danger: 'var(--danger)',
        ligtDanger: 'var(--ligtDanger)'
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
