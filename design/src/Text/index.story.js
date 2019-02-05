import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { styles } from '.';

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
  color: black;
`;

storiesOf('Design/Text', module).add('Fonts', () => (
  <>
    <h1>Fonts</h1>
    <p>
      <a href="https://app.zeplin.io/project/5c01378f7608892c84851d79/screen/5c0147744129e801cdf905ed">
        Source
      </a>
    </p>
    <p>
      <a href="https://github.com/rdey/designsystem/wiki/04.-Typography">
        Read more
      </a>
    </p>
    <Blocks>
      {styles.map(({ name, id, css }) => {
        const Font = styled(css('div'))`
          white-space: nowrap;
        `;
        return (
          <Block key={name}>
            <Font>{id}</Font>
          </Block>
        );
      })}
    </Blocks>
  </>
));
