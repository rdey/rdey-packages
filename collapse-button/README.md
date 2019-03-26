# collapse-button

> A button indicating a collapse of e.g. an accordion

[![NPM](https://img.shields.io/npm/v/@rdey/collapse-button.svg)](https://www.npmjs.com/package/collapse-button) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save collapse-button
```

## Usage

```tsx
import * as React from 'react'

import CollapseButton from 'collapse-button'

class Example extends React.Component {
  render () {
    return (
      <>
        <CollapseButton active={active} />
        <CollapseButton
          active={active}
          size={320}
          borderWidth={6}
          colorRight="red"
        />
      </>
    )
  }
}
```

## License

MIT © [ricsam](https://github.com/ricsam)
