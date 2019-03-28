const { resolve } = require('path');
const scopes = require('../../scopes');
const pushArray = (orig, additional) => {
  additional.forEach((add) => {
    orig.push(add);
  });
};
module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.context = __dirname;
  const rule = storybookBaseConfig.module.rules.find(({ use }) => {
    return use.find(({ loader }) => loader === 'babel-loader');
  });
  if (!rule || !rule.include || !rule.exclude) {
    return storybookBaseConfig;
  }
  scopes.forEach((scope) => {
    rule.include.push(resolve(__dirname, '../../' + scope));
    rule.exclude.push(resolve(__dirname, '../../' + scope + '/node_modules'));
    storybookBaseConfig.resolve.modules.push(
      resolve(__dirname, '../../' + scope + '/node_modules')
    );
  });

  storybookBaseConfig.resolve.modules.push(
    resolve(__dirname, '../node_modules')
  );
  return storybookBaseConfig;
};
