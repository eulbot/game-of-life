module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './**/tsconfig.json',
  },
  ignorePatterns: ['*.js'],
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  extends: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/no-danger': 'error',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '/e2e-test/**/*ts',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '__setup__/**/*.ts',
          '**/testing/**/*.ts',
          '**/testing/**/*.tsx',
        ],
      },
    ],
    '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
  },
};
