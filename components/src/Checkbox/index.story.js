import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Components/Checkbox', module)
  .add('Normal', () => (
    <Checkbox
      id="wef"
      checked
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('Dark', () => (
    <Checkbox
      id="wef"
      checked
      dark
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('rtl', () => (
    <Checkbox
      checked
      dark
      rtl
      text="I am or has been a pep during the last 2 years"
    />
  ))
  .add('with child', () => (
    <React.Fragment>

    <Checkbox checked dark rtl>
      <div>
        wef<br />
        omg<br />
        few
      </div>
    </Checkbox>
    <Checkbox checked dark>
      <ul>
        <li>wef</li>
        <li>omg</li>
        <li>few</li>
      </ul>
    </Checkbox>
    </React.Fragment>
  ));
