import fs from 'fs';
import esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';

fs.rmSync('dist', { recursive: true, force: true });

await esbuild.build({
  entryPoints: ['src/index.html'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
  watch: true,
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
  plugins: [htmlPlugin()],
});
