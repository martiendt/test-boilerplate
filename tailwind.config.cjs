module.exports = {
  purge: ["./src/**/*.{hbs,handlebars}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
