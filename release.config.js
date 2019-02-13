module.exports = {
  release: {
    branch: 'next',
  },
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
      },
    ],
    ["@semantic-release/exec", {
      "verifyConditionsCmd": "./ci/shouldRelease.js --subject=\"${commits[commits.length - 1].subject}\"",
      "publishCmd": "./ci/publish.js --version=\"${nextRelease.version}\" --subject=\"${commits[commits.length - 1].subject}\""
    }],
    '@semantic-release/github',
  ],
};
