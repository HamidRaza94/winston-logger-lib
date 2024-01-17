import { defineConfig } from 'tsup';

const config = defineConfig({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  outDir: 'build',
});

export default config;
