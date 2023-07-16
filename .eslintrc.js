module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      rules: {
        'no-console': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-empty': ['error', {allowEmptyCatch: true}],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto'
          }
        ],
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off'
      }
    }
  ]
};
