module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  ignorePatterns: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "@typescript-eslint/tslint",
    "import",
    "prefer-arrow",
    "jest",
    "sort-keys-fix",
    "typescript-sort-keys",
  ],
  rules: {
    "no-empty": ["error", { allowEmptyCatch: true }],
    "require-atomic-updates": "off",
    "no-console": "error",
    "typescript-sort-keys/interface": 2,
    "typescript-sort-keys/string-enum": 2,
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "import/no-default-export": "error",
    "object-shorthand": "error",
    "no-unreachable": ["warn"],
    eqeqeq: ["error", "smart"],
  },
};
