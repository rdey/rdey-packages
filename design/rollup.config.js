/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-local-resolve';
import path from 'path';

export default {
  input: 'lib.js',
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
  external: (p) => {
    let external = true;
    if (p.match(/^\./)) {
      external = false;
    }
    if (p.match(/node_modules/)) {
      external = true;
    }
    return external;
  },
};
