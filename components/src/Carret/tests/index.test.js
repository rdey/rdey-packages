import React from 'react';
import { shallow } from 'enzyme';

import Carret from '../index';

describe('<Carret />', () => {
  it('Expect to render', () => {
    shallow(<Carret />);
  });
});
