import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import istanbul from 'rollup-plugin-istanbul';

export default {
  input: 'tests/migrate-test.js',
  output: {
    file: 'build/test-bundle.js',
    format: 'cjs',
    sourcemap: true,
    interop: false
  },
  external: ['ava', 'path', 'sqlite', 'levelup', 'leveldown'],
  plugins: [
    multiEntry(),
    resolve(),
    commonjs(),
    istanbul({
      exclude: ['tests/**/*-test.js', 'node_modules/**/*']
    })
  ]
};
