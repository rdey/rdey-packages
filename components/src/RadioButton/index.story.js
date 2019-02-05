import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import RadioButton from './index';

storiesOf('Components/RadioButton', module)
  .add('Normal', () => (
    <RadioButton
      id="wef"
      checked
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('Dark', () => (
    <RadioButton
      id="wef"
      checked
      dark
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('rtl', () => (
    <RadioButton
      checked
      dark
      rtl
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('with child', () => (
    <React.Fragment>

      <RadioButton checked dark rtl>
        <div>
          wef<br />
          omg<br />
          few
      </div>
      </RadioButton>
      <RadioButton checked dark>
        <ul>
          <li>wef</li>
          <li>omg</li>
          <li>few</li>
        </ul>
      </RadioButton>
    </React.Fragment>
  ));
