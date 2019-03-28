# @rdey/grid

> A grid component. Has multiple break points

[![NPM](https://img.shields.io/npm/v/@rdey/grid.svg)](https://www.npmjs.com/package/@rdey/grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @rdey/grid
```

## Usage

```tsx
import * as React from 'react'

import Grid from '@rdey/grid'

class Example extends React.Component {
  render () {
    const viewport = 1024;
    return (
      <Grid viewport={viewport} margins={{ 1024: 32 }} numberOfCols={{ 1024: 8 }} />
    )
  }
}
```

## License

MIT © [ricsam](https://github.com/ricsam)
