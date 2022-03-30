const {guessProductionMode} = require('@ngneat/tailwind');

module.exports = {
  prefix: '',
  important: true,
  purge: {
    enabled: guessProductionMode(),
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
