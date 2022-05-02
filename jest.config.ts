module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'reports/coverage',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
