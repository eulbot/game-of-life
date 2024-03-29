import fs from 'fs';
import { build } from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';

fs.rmSync('dist', { recursive: true, force: true });

await build({
  entryPoints: ['src/index.html'],
  outdir: 'dist',
  minify: true,
  bundle: true,
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  plugins: [htmlPlugin()],
});
