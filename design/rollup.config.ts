/* eslint-disable import/no-extraneous-dependencies */
import resolve from 'rollup-plugin-local-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { camelCase } from 'lodash-es';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

const libraryName = '@rdey/design';
const globals = {
  invariant: 'invariant',
  'lodash-es': 'lodash-es',
  react: 'react',
  rxjs: 'rxjs',
  'rxjs/operators': 'rxjs.operators',
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
  external: Object.keys(globals),
};
