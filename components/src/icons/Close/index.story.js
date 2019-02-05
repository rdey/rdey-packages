import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Close from './index';

storiesOf('Components/Close', module)
  .add('Normal', () => (
    <Close />
  ))
  .add('Red', () => (
    <Close color="red" />
  ))
