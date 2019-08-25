import { terser } from 'rollup-plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'index.iife.js',
    format: 'iife',
    name: 'placement'
  },
  plugins: [ terser() ]
};
