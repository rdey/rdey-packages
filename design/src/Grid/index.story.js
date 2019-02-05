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

storiesOf('Design/Grid', module)
  .add('With dynamic column width', () => (
    <>
      {range(12).map((i) => (
        <Container key={i}>
          <p>{i}</p>
          <Grid dynamic>
            {range(i).map((ii) => (
              <Box key={ii} />
            ))}
          </Grid>
        </Container>
      ))}
    </>
  ))
  .add('With specific with', () => (
    <>
      {/* <Container>
        <p>Span 1/12</p>
        <Grid>
          <Box span="1" />
        </Grid>
      </Container>
      <Container>
        <p>Span 2/12</p>
        <Grid>
          <Box span="2" />
        </Grid>
      </Container> */}
      <Container>
        <p>Span 1/12</p>
        <Grid>
          <Box span="1" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 2/12</p>
        <Grid>
          <Box span="2" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 3/12</p>
        <Grid>
          <Box span="3" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 4/12</p>
        <Grid>
          <Box span="4" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 5/12</p>
        <Grid>
          <Box span="5" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 6/12</p>
        <Grid>
          <Box span="6" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 7/12</p>
        <Grid>
          <Box span="7" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 8/12</p>
        <Grid>
          <Box span="8" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 9/12</p>
        <Grid>
          <Box span="9" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 10/12</p>
        <Grid>
          <Box span="10" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 11/12</p>
        <Grid>
          <Box span="11" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span 12/12</p>
        <Grid>
          <Box span="12" />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
      <Container>
        <p>Span in middle</p>
        <Grid>
          <Box />
          <Box span={8} />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Grid>
      </Container>
    </>
  ));
