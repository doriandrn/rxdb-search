module.exports = {
  verbose: true,
  bail: true,
  coverageReporters: ['html', 'text'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false
    }
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '~/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    // '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  preset: 'ts-jest',
  testRegex: null
}
