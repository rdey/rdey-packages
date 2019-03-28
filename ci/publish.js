const path = require('path');
const fs = require('fs');
const execa = require('execa');
const allPosibleScopes = require('../scopes');
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

execa('git', ['log', '-1', '--pretty=%B'])
  .then(async ({ stdout }) => {
    const scopes = getScopesFromSubject(stdout);

    const scopesToUpdate = scopes.filter((scope) =>
      allPosibleScopes.includes(scope));

    console.log('will publish', scopesToUpdate.join(', '));

    const publishScript = `${scopesToUpdate
      .map((scope) => {
        const cwd = path.resolve(__dirname, `../${scope}`);
        return [
          // `npm set registry=https://registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`,
          `cd ${cwd}`,
          'yarn install',
          'npm publish --access public',
        ].join('\n');
      })
      .join('\n')}\n`;

    const publishScriptPath = path.resolve(__dirname, '../', 'publish.sh');
    fs.writeFileSync(publishScriptPath, publishScript);

    await execa('chmod', ['+x', publishScriptPath]);

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

      await awaitAndPipe('npm', ['run', 'build'], {
        cwd,
      })()
        .then(awaitAndPipe(
            'npm',
            ['version', prevVersion, '--allow-same-version'],
            {
              cwd,
            },
          ),)
        .then(awaitAndPipe('npm', ['version', 'patch'], {
            cwd,
          }),);
    }
  })
  .catch((err) => {
    process.exit(1);
  });
