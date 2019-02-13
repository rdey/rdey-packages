const { resolve } = require('path');
const { writeFileSync } = require('fs');
const log = (msg) => {
  // process.stdout.write(`✖ ${msg}\n`);
  // writeFileSync(resolve(__dirname, 'logs.txt'), msg);
  console.log(msg);
};
module.exports = log;
