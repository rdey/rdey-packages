import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel';

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    resolve({
      extensions: ['.tsx'],
    }),
    babel({
      babelrc: false,
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['babel-plugin-styled-components'],
      extensions: ['.tsx'],
    }),
    commonjs(),
  ],
};
