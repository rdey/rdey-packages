import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import GridBase, { defaultGridConfig } from '..';

const Grid = styled(GridBase)`
  border: 1px solid black;
`;

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

const xBoxes = (x) => range(x).map((v) => <Box key={v} />);

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
      {range(12).map((x) => (
        <Container>
          <p>
            <>Span </>
            {x}
            <>/12</>
          </p>
          <Grid>
            <Box span={x} />
            {xBoxes(12)}
          </Grid>
        </Container>
      ))}
      <Container>
        <p>Span in middle</p>
        <Grid>
          <Box />
          <Box span={8} />
          {xBoxes(12)}
        </Grid>
      </Container>
    </>
  ))
  .add('With specific grid layout', () =>
    [
      defaultGridConfig,
      {
        ...defaultGridConfig,
        femto: {
          margin: 1,
          columns: 12,
        },
        nano: {
          margin: 1,
          columns: 12,
        },
        milli: {
          margin: 1.5,
          columns: 12,
        },
        kilo: {
          margin: 1.5,
          columns: 1,
        },
        giga: {
          margin: 2,
          columns: 1,
        },
        peta: {
          margin: 2.5,
          columns: 1,
        },
      },
      {
        femto: {
          columns: 2,
        },
      },
      {
        nano: {
          columns: 1,
        },
      },
    ].map((props) => (
      <div style={{ padding: '2em', borderBottom: '1px solid black' }}>
        <pre style={{ fontSize: '0.75em' }}>
          {JSON.stringify(props, null, 2)}
        </pre>
        {range(12).map((i) => (
          <Container key={i}>
            <p>{i}</p>
            <Grid {...props}>
              {range(i).map((ii) => (
                <Box key={ii} />
              ))}
            </Grid>
          </Container>
        ))}
      </div>
    )) );
