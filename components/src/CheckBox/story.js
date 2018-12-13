import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Checkbox', module).add('Normal', () => (
  <Checkbox
    id="wef"
    checked
    onClick={() => {}}
  >
    I am or has been a pep during the last 2 years
  </Checkbox>
));
