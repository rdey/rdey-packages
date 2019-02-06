rm -rf ./**/node_modules/@rdey/design
yarn run --cwd=./design build
mkdir -p ./node_modules/@rdey/design
rsync -av --progress --exclude="node_modules" ./design/ ./node_modules/@rdey/design/

rm -rf ./**/node_modules/@rdey/components
yarn run --cwd=./components build
mkdir -p ./node_modules/@rdey/components
rsync -av --progress --exclude="node_modules" ./components/ ./node_modules/@rdey/components/
