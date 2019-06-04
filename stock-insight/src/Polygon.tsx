import * as React from 'react';
import styled from 'styled-components';

const Polygon = styled.polygon`
  stroke-width: 2;
  transition: opacity 0.25s;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default Polygon;
