module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      env: {
        jest: true,
      },
      files: ['tests/**/*'],
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  },
};
