import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import LoadingSpinner from './index';

storiesOf('Loading spinner', module)
  .add('Normal', () => (
    <LoadingSpinner />
  ))
