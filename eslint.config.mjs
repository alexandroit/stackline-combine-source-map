const globals = {
  Buffer: 'readonly',
  JSON: 'readonly',
  Object: 'readonly',
  URL: 'readonly',
  Uint8Array: 'readonly',
  console: 'readonly',
  module: 'readonly',
  process: 'readonly',
  require: 'readonly'
};

export default [
  { ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'site-dist/**'] },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { ecmaVersion: 2022, globals, sourceType: 'module' },
    rules: {
      eqeqeq: 'error',
      'no-constant-condition': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'off'
    }
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['docs-site/**/*.js'],
    languageOptions: {
      globals: {
        atob: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        TextDecoder: 'readonly',
        window: 'readonly'
      }
    }
  }
];
