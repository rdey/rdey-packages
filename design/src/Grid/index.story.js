import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '.';


const range = (l) => {
  const numbers = [];
  for (let i = 1; i <= l; i += 1) {
    numbers.push(i);
  }
  return numbers;
};



const Box = styled.div`
  background-color: red;
  height: 10px;
  width: 100%;
`;

const Container = styled.div`
  padding: 24px;
  background-color: grey;
  margin: 2em 0;
`;


storiesOf('Grid', module)
  .add('Normal', () => (
    <>
      {range(12).map((i) => (
        <Container key={i}>
          <p>{i}</p>
          <Grid>
            {range(i).map((ii) => <Box key={ii} />)}
          </Grid>
        </Container>
      ))}
    </>
  ));
