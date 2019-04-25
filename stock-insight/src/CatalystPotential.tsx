/**
 * @class CatalystPotential
 */

import styled from 'styled-components';
import * as React from 'react';

export type Props = { text: string };

const Wrapper = styled.div`

`;

const CatalystPotential = (props: Props) => {
  const { text } = props;

  return <Wrapper>Example Component: {text}</Wrapper>;
};

export default CatalystPotential;
