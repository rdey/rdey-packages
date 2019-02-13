const path = require('path');
const execa = require('execa');
const log = require('./log');
const getScopesFromSubject = require('./getScopesFromSubject');

const awaitAndPipe = (...args) => {
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

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < scopesToUpdate.length; i += 1) {
    await scopesToUpdate.map((scope) =>
      awaitAndPipe('npm', ['run', 'build'], {
        cwd: path.resolve(__dirname, `../${scope}`),
      }).then(() =>
        awaitAndPipe('npm', ['version', 'patch'], {
          cwd: path.resolve(__dirname, `../${scope}`),
        }).then(() =>
          awaitAndPipe('npm', ['publish', '--access', 'public'], {
            env: {
              NPM_TOKEN: process.env.NPM_TOKEN,
            },
            cwd: path.resolve(__dirname, `../${scope}`),
          }))));
  }
});
