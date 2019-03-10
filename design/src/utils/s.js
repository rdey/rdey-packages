const s = {
  css: (...args) => {
    const parts = args.slice(1);
    const c = args[0].reduce((css, chunk, index) => {
      if (index > 0) {
        return css + parts[index - 1] + chunk;
      }
      return css + chunk;
    }, '');
    return c;
  },
};
export default s;
