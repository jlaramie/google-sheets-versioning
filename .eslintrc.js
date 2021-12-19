module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', 'jest'],
  rules: {
    'no-unused-vars': 'warn',
    'jest/prefer-expect-assertions': 0,
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ]
  },
  ignorePatterns: ['**/packages/*']
};
