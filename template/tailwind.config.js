const plugin = require('tailwindcss/plugin');

/**
 * @type {import('twrnc').TwConfig}
 */
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        'flex-center': 'justify-center items-center',
        'flex-fill-center': 'flex-1 justify-center items-center',
        'abs-fill': 'absolute top-0 left-0 right-0 bottom-0',
        'background-color': 'bg-white dark:bg-black',
      });
    }),
  ],
};
