module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
    jest: true,
  },
  plugins: ["prettier", "import"],
  extends: ["plugin:prettier/recommended", "plugin:import/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120 }],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
          },
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      /**
       * Since using "subpath patterns" makes an eslint error
       * https://nodejs.org/api/packages.html#packages_subpath_patterns
       * https://github.com/import-js/eslint-plugin-import/issues/1868
       * We use custom resolver to solve this issue
       * https://www.npmjs.com/package/eslint-import-resolver-custom-alias
       */
      "eslint-import-resolver-custom-alias": {
        alias: {
          "#src": "./src",
        },
      },
    },
  },
};
