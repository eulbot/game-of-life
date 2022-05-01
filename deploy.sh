set -e

rm -rf dist
mkdir ./dist && cp ./src/index.html ./dist/
esbuild src/main.ts --sourcemap --outdir=dist

git subtree push --prefix dist origin gh-pages

cd -
