const { resolve } = path;
const { version, subject } = require('minimist')(process.argv.slice(2));
const getScopesFromSubject = require('./getScopesFromSubject');
const execa = require('execa');

try {
  const scopes = getScopesFromSubject(subject);

  if (!scopes.length) {
    throw new Error('no scope in message');
  }

  scopes
    .filter((scope) => ['components', 'design'].includes(scope))
    .forEach((scope) => {
      execa.shellSync(
        'npm',
        ['publish', '--access', 'public', '--tag', version],
        {
          env: {
            NPM_TOKEN: process.env.NPM_TOKEN,
          },
          cwd: resolve(__dirname, '../' + scope),
        }
      );
    });
} catch (err) {
  console.log('something went wrong when publishing, can not make an release');
  process.exit(1);
}
