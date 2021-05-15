module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'dark': "url('/static/images/bg.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
