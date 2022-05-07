set -e

node esbuild.config.js
git subtree push --prefix dist origin gh-pages

cd -