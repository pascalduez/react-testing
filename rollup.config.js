import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

let plugins = [
  peerDepsExternal(),
  postcss({
    modules: true,
    extract: `dist/${pkg.name}.css`,
  }),
  babel({
    exclude: ['node_modules/**'],
    runtimeHelpers: true,
  }),
  resolve(),
  commonjs(),
  sizeSnapshot(),
];

export default {
  plugins,
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      name: pkg.name,
      format: 'umd',
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
};
