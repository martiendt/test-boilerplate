module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
