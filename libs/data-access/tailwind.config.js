const {guessProductionMode} = require('@ngneat/tailwind');

module.exports = {
  presets: [require('../../tailwind.config.js')],
  prefix: '',
  important: true,
  purge: {
    enabled: guessProductionMode(),
    content: ['./**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
