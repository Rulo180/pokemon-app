const prettierConfig = require('./.prettierrc');

module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': ['error', prettierConfig], // apply rules from prettier config file
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
};
