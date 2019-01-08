import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Checkbox', module)
  .add('Normal', () => (
    <Checkbox id="wef" checked onClick={() => {}}>
      I am or has been a pep during the last 2 years
    </Checkbox>
  ))
  .add('Dark', () => (
    <Checkbox id="wef" checked onClick={() => {}} dark>
      I am or has been a pep during the last 2 years
    </Checkbox>
  ))
  .add('rtl', () => (
    <Checkbox checked dark rtl>
      I am or has been a pep during the last 2 years
    </Checkbox>
  ))
