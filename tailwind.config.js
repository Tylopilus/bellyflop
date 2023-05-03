const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--inter-font)', ...fontFamily.sans],
        serif: ['var(--inter-font)', ...fontFamily.serif],
      },
      colors: {
        'theme-dark': '#1C1B1E',
        'theme-medium': '#2E2C35',
        alert: '#C22A2A',
      },
      backgroundImage: {
        'theme-gradient':
          'linear-gradient(180deg, rgba(46, 44, 53, 0) 10.94%, #2E2C35 72.92%, #2E2C35 100%)',
      },
    },
  },
  plugins: [],
};
