set -e

rm -rf dist
mkdir ./dist && cp ./src/index.html ./dist/
node esbuild.config.js

git subtree push --prefix dist origin gh-pages

cd -
