# @rdey monorepo
Contains various npm packages used in the apps of Redeye.

### Storybook
https://loving-mclean-6c6672.netlify.com/


### Publishing the packages
run yarn run commit and set the scope to
e.g. `design`, `design,components` or `components` to make CI publish the corresponding package(s) to npm.

#### Adding a new package
Make sure you add the name of the package to scopes.js. Manually publish the package to npm also before pushing to master.
