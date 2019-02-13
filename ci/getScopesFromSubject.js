const getScopesFromSubject = (subject) => {
  try {
    const [, scope] = subject.match(/^.*\(([^)]+)\):/);
    if (scope.match(',')) {
      return scope.split(',').map((s) => s.replace(/\s/), '');
    }
    return [scope];
  } catch (err) {
    // do nothing
  }

  return [];
};

module.exports = getScopesFromSubject;
