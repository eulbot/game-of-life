set -e

rm -rf dist
mkdir ./dist && cp ./src/index.html ./dist/
esbuild src/main.ts --sourcemap --outdir=dist

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:eulbot/game-of-life.git main:gh-pages

cd -
