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
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
  },
};
