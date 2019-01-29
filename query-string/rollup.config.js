import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import path from 'path';

const include = /.*/

export default {
  input: 'index.js',
  output: {
    file: 'dist/concated.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve({
      include,
    }),
    commonjs({
      include,
    }),
  ],
  external: () => {
    return false;
  },
};
