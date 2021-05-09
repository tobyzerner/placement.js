import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.ts',
  output: [
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
  plugins: [ typescript(), terser(), filesize() ]
};
