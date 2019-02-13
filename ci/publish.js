const path = require('path');
const fs = require('fs');
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

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < scopesToUpdate.length; i += 1) {
    const scope = scopesToUpdate[i];

    const cwd = path.resolve(__dirname, `../${scope}`);

    const { stdout: prevVersion } = await awaitAndPipe(
      'npm',
      ['view', `@rdey/${scope}`, 'version'],
      {
        cwd,
      },
    )();

    fs.writeFileSync(
      path.resolve(cwd, '.npmrc'),
      fs.readFileSync(__dirname, '.npmrc'),
    );

    await awaitAndPipe('npm', ['run', 'build'], {
      cwd,
    })()
      .then(
        awaitAndPipe('npm', ['version', prevVersion, '--allow-same-version'], {
          cwd,
        }),
      )
      .then(
        awaitAndPipe('npm', ['version', 'patch'], {
          cwd,
        }),
      )
      .then(
        awaitAndPipe('npm', ['publish', '--access', 'public'], {
          env: {
            NPM_TOKEN: process.env.NPM_TOKEN,
            NPM_CONFIG_GLOBALCONFIG: path.resolve(__dirname, '.npmrc'),
          },
          cwd,
        }),
      );
  }
});
