import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  globalIgnores([
    '.next/**',
    '.vinext/**',
    '.wrangler/**',
    'dist/**',
    'out/**',
    'build/**',
    'public/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
