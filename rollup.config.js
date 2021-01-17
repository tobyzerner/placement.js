import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.unpkg,
      format: 'iife',
      name: 'placement'
    }
  ],
  plugins: [ typescript(), terser() ]
};
