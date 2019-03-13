import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { primaryTextMixin, secondaryTextMixin } from '.';

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
storiesOf('Showcase', module).add('Various component', () => (
  <>
    <Entry />
  </>
));
