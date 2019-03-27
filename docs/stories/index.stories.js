import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { primaryTextMixin, secondaryTextMixin, colors } from '@rdey/design';

import '../../components/src/Accordion/index.story';
import '../../components/src/Checkbox/index.story';
import '../../components/src/RadioButton/index.story';
import '../../components/src/icons/Close/index.story';
import '../../components/src/LoadingSpinner/index.story';
import '../../components/src/Tabs/index.story';

const RandomCompMainHeader = styled.h1`
  ${primaryTextMixin({ size: 24, color: 'primary0' })}
`;

const RandomCompOtherHeader = styled.h3`
  ${primaryTextMixin({ size: 24, color: 'base1', fontFamily: 'secondary' })}
`;

const RandomCompOtherHeader2 = styled.h3`
  ${secondaryTextMixin({ size: 14 })};
`;
const RandomCompOtherHeader3 = styled.h3`
  ${primaryTextMixin()};
`;

const Entry = () => (
  <div>
    <RandomCompMainHeader>Header</RandomCompMainHeader>
    <p>Magic component</p>
    <RandomCompOtherHeader>Header</RandomCompOtherHeader>
    <RandomCompOtherHeader2>Header</RandomCompOtherHeader2>
    <RandomCompOtherHeader3>Header</RandomCompOtherHeader3>
  </div>
);
storiesOf('Design/Showcase', module).add('Various component', () => (
  <>
    <Entry />
  </>
));

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
