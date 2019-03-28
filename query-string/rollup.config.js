import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const include = /.*/;

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
  external: () => false,
};
