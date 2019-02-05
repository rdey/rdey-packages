/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-local-resolve';
import path from 'path';
import rollupExternalModules from 'rollup-external-modules';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    babel({
      configFile: path.resolve(__dirname, './.babelrc'),
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
  external: rollupExternalModules,
};
