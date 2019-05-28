import * as React from 'react';
import styled from 'styled-components';
import { getColor } from '@rdey/design';
import { useValues, usePriceToX } from './Context';
import { AbsoluteWrapper } from './components';
import { Size } from './types';
import { bearToBullLineHeights, bearToBullLineTops } from './fairValueRangeTheme';



const Bar =
  styled(AbsoluteWrapper) <
  { left: number, width: number, size: Size } >
  `
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ size }) => bearToBullLineHeights[size]}px;
  background-color: ${getColor({ color: 'secondary4', opacity: 0.16 })};
  top: ${({ size }) => bearToBullLineTops[size]}px;
`;

const BearToBullLine = () => {
  const { bear, bull, size } = useValues();
  const left = usePriceToX(bear);
  const right = usePriceToX(bull);
  const width = right - left;

  return <Bar width={width} left={left} size={size} />;
};

export default BearToBullLine;
