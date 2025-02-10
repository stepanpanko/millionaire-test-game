module.exports = {
      root: true,
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'next',
        'next/core-web-vitals',
        'prettier'
      ],
      rules: {
        'prettier/prettier': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^\\u0000', '^react', '^[a-z]'],
              ['^@/'],
              ['^\\.', '^\\.\\.(?!/?$)', '^\\.\\./?$']
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    };
    