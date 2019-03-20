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
    pushArray(rule.include, [
      resolve(__dirname, '../../' + scope),
    ]);
    pushArray(rule.exclude, [
      resolve(__dirname, '../../' + scope + '/node_modules'),
    ]);
  });
  return storybookBaseConfig;
};
