import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { Display56MU, styles } from '.';

const Wrapper = styled.div`
  padding: 1em;
`;

const Blocks = styled.div`
  display: grid;
  grid-template-columns: 1em auto 1em auto 1em;
  grid-template-rows: auto;
`;

const Pre = styled.pre`
  padding-left: 1em;
  border-left: 1px solid black;
  grid-column-start: 4;
`;

storiesOf('Design/Text', module).add('Fonts', () => (
  <>
    <Wrapper>
      <h1 style={Display56MU.css}>Fonts</h1>
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
    </Wrapper>
    <Blocks>
      {styles.map(({
        name, id, css, sc,
      }) => {
        const Font = styled(sc('div'))`
          white-space: nowrap;
          grid-column-start: 2;
        `;
        return (
          <React.Fragment key={name}>
            <Font>{id}</Font>
            <Pre>
              <>
                {name}
                {' '}
                <>=</>
                {' '}
              </>
              {JSON.stringify(css, null, 2)}
            </Pre>
          </React.Fragment>
        );
      })}
    </Blocks>
  </>
));
