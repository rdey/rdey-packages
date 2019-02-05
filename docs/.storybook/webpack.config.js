const { resolve } = require('path');
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
  pushArray(rule.include, [
    resolve(__dirname, '../../design'),
    resolve(__dirname, '../../components'),
  ]);
  pushArray(rule.exclude, [
    resolve(__dirname, '../../design/node_modules'),
    resolve(__dirname, '../../components/node_modules'),
  ]);
  return storybookBaseConfig;
};
