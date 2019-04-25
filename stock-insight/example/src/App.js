import React, { Component } from 'react'

import { CompanyQuality, FairValueRange, CatalystPotential } from 'stock-insight'

export default class App extends Component {
  render () {
    return (
      <div>
        <CompanyQuality text="Modern React component module" />
        <FairValueRange text="Modern React component module" />
        <CatalystPotential text="Modern React component module" />
      </div>
    );
  }
}
