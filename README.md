# @rdey monorepo
Contains various npm packages used in the apps of Redeye.

### Storybook
http://rdey.github.io/rdey-packages

### Design API docs
http://rdey.github.io/rdey-packages/design


### Publishing the packages using the CI
run `yarn run commit` and set the scope to
e.g. `design`, `design,components` or `components,grid` to make CI publish the corresponding package(s) to npm.

#### Adding a new package

1) Make sure you add the name of the package to scopes.js.
2) Make sure the package can publish itself on ci, e.g. make sure prePublishOnly works and that the package dependencies are installed during ci.
3) Manually publish the package to npm also before pushing to master. `cd new-package && npm publish --access=public`

### Storybook (docs package)
For every package included in the scopes.js you can add *.story.js files to add to the storybook
