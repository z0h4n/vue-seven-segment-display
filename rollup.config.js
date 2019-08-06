import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/seven-segment-display.vue',
  output: {
    name: 'SevenSegmentDisplay',
    exports: 'default',
  },
  plugins: [
    commonjs(),
    vue(),
    buble(),
    terser(),
  ],
};
