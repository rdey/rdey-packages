const path = require('path');
const execa = require('execa');
const log = require('./log');
const getScopesFromSubject = require('./getScopesFromSubject');

const awaitAndPipe = (...args) => () => {
  const p = execa(...args);
  p.stdout.pipe(process.stdout);
  p.stderr.pipe(process.stderr);
  return new Promise((resolve) => {
    p.then(resolve);
  });
};

execa('git', ['log', '-1', '--pretty=%B']).then(async ({ stdout }) => {
  const scopes = getScopesFromSubject(stdout);

  if (!scopes.length) {
    throw new Error('no scope in message');
  }

  const scopesToUpdate = scopes.filter((scope) =>
    ['components', 'design'].includes(scope));

  console.log('will publish', JSON.stringify(scopesToUpdate));

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < scopesToUpdate.length; i += 1) {
    const scope = scopesToUpdate[i];
    await awaitAndPipe('npm', ['run', 'build'], {
      cwd: path.resolve(__dirname, `../${scope}`),
    })()
      .then(
        awaitAndPipe(
          'npm',
          [
            'set',
            'registry',
            `https//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`,
          ],
          {
            cwd: path.resolve(__dirname, `../${scope}`),
          },
        ),
      )
      .then(
        awaitAndPipe('npm', ['version', 'patch'], {
          cwd: path.resolve(__dirname, `../${scope}`),
        }),
      )
      .then(
        awaitAndPipe('yarn', ['publish', '--access', 'public'], {
          env: {
            NPM_TOKEN: process.env.NPM_TOKEN,
            NPM_CONFIG_GLOBALCONFIG: path.resolve(__dirname, '../.npmrc'),
          },
          cwd: path.resolve(__dirname, `../${scope}`),
        }),
      );
  }
});
