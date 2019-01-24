const { writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');

const css = readFileSync(resolve(__dirname, 'dist/main.css'), 'utf8');

writeFileSync(resolve(__dirname, 'dist/css.js'), `

const css = \`
<style>
${css}
</style>
\`;


module.exports = css;

`);
