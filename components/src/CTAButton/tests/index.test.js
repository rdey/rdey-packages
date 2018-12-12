import React from 'react';
import { shallow } from 'enzyme';

import ContinueButton from '../index';

describe('<ContinueButton />', () => {
  it('Expect to render', () => {
    shallow(<ContinueButton />);
  });
});
