const ssrPdf = require('./dist/dev');
const css = require('./dist/css');
const htmlTemplate = require('./htmlTemplate');

module.exports = async (token, host) => {
  const { body, scStyles } = await ssrPdf(token, host);

  const html = htmlTemplate({
    body,
    styles: `${css}\n${scStyles}`,
  });

  return html;
};
