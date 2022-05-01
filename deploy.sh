set -e

yarn run copy
yarn run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:eulbot/game-of-life.git main:gh-pages

cd -
