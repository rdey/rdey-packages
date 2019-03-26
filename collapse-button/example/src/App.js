import React, { Component } from 'react'

import CollapseButton from 'collapse-button'

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  toggle = () => {
    this.setState(({ active }) => ({ active: !active }));
  }

  render () {
    const { active } = this.state;
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <CollapseButton active={active} />
        <CollapseButton
          active={active}
          size={320}
          borderWidth={6}
          colorRight="red"
        />
      </div>
    );
  }
}
