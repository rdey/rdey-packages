# remove from page
rm -rf ./**/node_modules/@rdey/components
rm -rf ./**/node_modules/@rdey/design

# add to root
mkdir -p ./node_modules/@rdey/components
rsync -av --progress ./components/ ./node_modules/@rdey/components/ --exclude node_modules

mkdir -p ./node_modules/@rdey/design
rsync -av --progress ./design/ ./node_modules/@rdey/design/ --exclude node_modules
