import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import { storiesOf } from '@storybook/react';
import colors from '.';

const Blocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const Block = styled.div`
  background: ${({ color }) => color};
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const Text = styled.div`
  color: rgb(180, 180, 180);
  mix-blend-mode: difference;
  white-space: nowrap;
  font-family: 'Courier New', Courier, monospace;
`;

storiesOf('Design/Colors', module).add('Palette', () => (
  <>
    <h1>Color Palette</h1>
    <p>
      <a href="https://github.com/rdey/designsystem/wiki/03E.-Color-Palette">
        Source
      </a>
    </p>
    <p>
      <a href="https://github.com/rdey/designsystem/wiki/03D.-Palette-Setup">
        Palette Setup
      </a>
    </p>
    <Blocks>
      {Object.entries(colors).map(([key, { hslCss }]) => (
        <Block color={hslCss} key={key}>
          <Text>
            {key}
            <>: </>
            {hslCss}
          </Text>
        </Block>
      ))}
    </Blocks>
  </>
));
