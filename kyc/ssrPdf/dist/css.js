

const css = `
<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
}


h1, h2, h3, h4, h5 {
  font-family: Oswald;
  font-weight: 300;
  margin: 0;
  padding: 0;
  page-break-after: avoid;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 1.75rem;
  line-height: 1.14;
  margin: 2.5rem 0;
}

h3 {
  font-size: 1.125rem;
}

h4 {
  font-size: 1rem;
}

h5 {
  font-size: 0.625rem;
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

strong {
  font-weight: 500;
}

a {
  color: #fe8585;
}


</style>
`;


module.exports = css;

