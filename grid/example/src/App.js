import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { range, shuffle } from 'lodash';
import GridBase from '@rdey/grid';

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
  };

  shuffle = () => {
    this.setState({
      items: shuffle(range(numItems)),
    });
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.shuffle}>Shuffle</button>
        <Grid
          dynamic
          items={this.state.items.map((ii) => ({
            Cell: () => <Box key={ii}>{ii}</Box>,
            key: ii,
          }))}
        />
      </Fragment>
    );
  }
}
