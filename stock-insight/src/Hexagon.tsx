import * as React from 'react';
import styled from 'styled-components';

import Polygon from './Polygon';

type Props = {
  width: number,
  fill: string,
  x: number,
  stroke: string,
  bottomLeftOffset?: number,
  bottomTopOffset?: number,
  y: number,
};

const Hexagon = ({
  width,
  x,
  fill,
  stroke,
  bottomLeftOffset = 0,
  bottomTopOffset = 0,
  y,
}: Props) => {
  const side = width / 2;
  const offset = side / 2;
  /* top line clockwise */
  const polygon = `
    ${offset + x}, ${y}
    ${x + width - offset}, ${y}
    ${width + x}, ${y + width / 2}
    ${x + width - offset}, ${y + width}
    ${offset + x + bottomLeftOffset * 2}, ${y + width}
    ${x + bottomLeftOffset}, ${y + width / 2 + bottomTopOffset}
    ${offset + x}, ${y}
  `;
  return (
    <>
      <Polygon points={polygon} stroke={stroke} fill={fill} />
    </>
  );
};

export default Hexagon;
