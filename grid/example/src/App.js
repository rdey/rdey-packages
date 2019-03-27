import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { range, shuffle } from 'lodash';
import GridBase from '@rdey/grid';
import { viewportEpic, getViewport } from '@rdey/design';

const Grid = styled(GridBase)`
  border: 1px solid black;
`;

const Box = styled.div`
  background-color: red;
  height: 10px;
  width: 100%;
  color: white;
  font-size: 12px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 24px;
  background-color: grey;
  margin: 2em 0;
`;

const numItems = 44;

export default class App extends Component {
  state = {
    items: range(numItems),
    viewport: getViewport(),
  };

  componentDidMount() {
    this.subscription = viewportEpic().subscribe(({ viewport }) => {
      this.setState({ viewport });
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  shuffle = () => {
    this.setState({
      items: shuffle(range(numItems)),
    });
  };

  render() {
    const { viewport } = this.state;
    return (
      <Fragment>
        <button onClick={this.shuffle}>Shuffle</button>
        <Grid
          viewport={viewport}
          items={this.state.items.map((ii) => ({
            Cell: () => <Box key={ii}>{ii}</Box>,
            key: ii,
          }))}
        />
      </Fragment>
    );
  }
}
