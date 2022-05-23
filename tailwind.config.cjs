module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  darkmode: true, // or 'media' or 'class'
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
};