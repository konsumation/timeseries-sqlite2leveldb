export default {
  input: 'tests/migrate-test.js',
  output: {
    file: 'build/test-bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  external: ['ava', 'path', 'sqlite', 'levelup', 'leveldown'],
  plugins: []
};
