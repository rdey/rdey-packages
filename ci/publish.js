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

execa('git', ['log', '-1', '--pretty=%B'])
  .then(async ({ stdout }) => {
    const scopes = getScopesFromSubject(stdout);

    const scopesToUpdate = scopes.filter((scope) =>
      ['components', 'design'].includes(scope));

    const publishScript = `${scopesToUpdate
      .map((scope) => {
        const cwd = path.resolve(__dirname, `../${scope}`);
        return `cd ${cwd}\nnpm publish --access public\n`;
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

      const npmrcContent = fs.readFileSync(
        path.resolve(__dirname, '.npmrc'),
        'utf8',
      );
      fs.writeFileSync(path.resolve(cwd, '.npmrc'), npmrcContent, 'utf8');

      await awaitAndPipe('npm', ['run', 'build'], {
        cwd,
      })()
        .then(
          awaitAndPipe(
            'npm',
            ['version', prevVersion, '--allow-same-version'],
            {
              cwd,
            },
          ),
        )
        .then(
          awaitAndPipe('npm', ['version', 'patch'], {
            cwd,
          }),
        );
    }
  })
  .catch((err) => {
    process.exit(1);
  });
