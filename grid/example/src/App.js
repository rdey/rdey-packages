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
const initialSubsetLength = 2;

export default class App extends Component {
  state = {
    items: range(numItems),
    subset: range(2),
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

  toggleSubset = () => {
    this.setState((prevState) => {
      return {
        subset:
          prevState.subset.length === initialSubsetLength
            ? [
                ...range(2),
                ...shuffle(range(12)).map((i) => i + 24),
                ...range(2).map((i) => i + 50),
              ]
            : range(initialSubsetLength),
      };
    });
  }

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
          duration={5000}
        />
        <button onClick={this.toggleSubset}>Toggle subset</button>
        <Grid
          viewport={viewport}
          items={this.state.subset.map((ii) => ({
            Cell: () => <Box key={ii}>{ii}</Box>,
            key: ii,
          }))}
          duration={3000}
        />
      </Fragment>
    );
  }
}
