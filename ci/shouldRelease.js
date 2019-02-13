const { subject } = require('minimist')(process.argv.slice(2));
const getScopesFromSubject = require('./getScopesFromSubject');

try {
  const scopes = getScopesFromSubject(subject);

  if (!scopes.length) {
    throw new Error('no scope in message');
  }

  if (scopes.includes('design') || scopes.includes('components')) {
    console.log('should release ' + scopes.join(', '));
  } else {
    console.log('no release available for ' + scopes.join(', '));
    process.exit(1);
  }
} catch (err) {
  console.log('invalid message, will not do an release');
  process.exit(1);
}
