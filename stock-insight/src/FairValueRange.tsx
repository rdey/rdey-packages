/**
 * @class FairValueRange
 */

import styled from 'styled-components';
import * as React from 'react';

export type Props = { text: string };

const Wrapper = styled.div`

`;

const FairValueRange = (props: Props) => {
  const { text } = props;

  return <Wrapper>Example Component: {text}</Wrapper>;
};

export default FairValueRange;
