/**
 * @class CatalystPotential
 */

import styled, { ThemeProvider } from 'styled-components';
import * as React from 'react';
import { primaryTextMixin, getColor } from '@rdey/design';
import Polygon from './Polygon';
import Hexagon from './Hexagon';
import { Size } from './types';
import { CatalystHeaderTitle } from './components';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
const SvgWrapper = styled.div`
  display: flex;
`;

const makeCss = (width: number, height: number) => {
  return `
    width: ${width}px;
    height: ${height}px;
  `;
}

const sizeMixin = ({ theme: { size }}: {
  theme: {
    size: Size
  }
}) => {
  if (size === 'l') {
    return makeCss(88, 72);
  } else if (size === 'm') {
    return makeCss(50, 39);
  } else if (size === 's') {
    return makeCss(31, 24);
  }
  return '';
 }

const Svg = styled.svg`
  ${sizeMixin};
`;

const Line = styled.line``;

type LayerProps = {
  outerWidth: number,
  innerWidth: number,
  stroke: string,
  fill: string,
  innerX?: number,
  outerX?: number,
  topLeftOffset?: number,
};
const Layer = ({
  outerWidth,
  innerWidth,
  stroke,
  fill,
  innerX = 0,
  outerX = 0,
  topLeftOffset = 0,
}: LayerProps) => {
  const outerSide = outerWidth / 2;
  const outerOffset = outerSide / 2;
  const outerY = 80 - outerWidth;

  const innerSide = innerWidth / 2;
  const innerOffset = innerSide / 2;
  const innerY = 80 - innerWidth;

  const polygon = `
    ${outerOffset + outerX + topLeftOffset}, ${outerY}
    ${outerX + outerWidth - outerOffset}, ${outerY}
    ${outerWidth + outerX}, ${outerY + outerWidth / 2}
    ${outerX + outerWidth - outerOffset}, ${outerY + outerWidth}

    ${innerX + innerWidth - innerOffset}, ${innerY + innerWidth}
    ${innerWidth + innerX}, ${innerY + innerWidth / 2}
    ${innerX + innerWidth - innerOffset}, ${innerY}
    ${innerOffset + innerX}, ${innerY}

    ${outerOffset + outerX + topLeftOffset}, ${outerY}
  `;
  return <Polygon points={polygon} stroke={stroke} fill={fill} />;
};

const Label = styled.div`
  ${primaryTextMixin({
    color: 'secondary4',
    fontSize: 12,
    fontWeight: 500,
  })};
  line-height: 1;
`;

type Props = {
  short?: boolean,
  mid?: boolean,
  long?: boolean,
  value: number,
  size: Size,
};

const Impact = ({
  short = false,
  mid = false,
  long = false,
  value,
  size,
}: Props) => {
  return (
    <ThemeProvider theme={{ size }}>
      <div css="display: inline-block;">
        <Wrapper>
          <SvgWrapper>
            <Svg viewBox="-1 -1 92 82" preserveAspectRatio="none">
              {/* borders */}
              <Layer
                innerWidth={60}
                outerWidth={80}
                fill={long ? getColor({ color: 'secondary4' }) : 'transparent'}
                stroke={getColor({ color: 'base8' })}
                outerX={10}
                innerX={5}
              />
              <Layer
                innerWidth={40}
                outerWidth={60}
                fill={mid ? getColor({ color: 'secondary4' }) : 'transparent'}
                stroke={getColor({ color: 'base8' })}
                outerX={5}
                innerX={0}
              />
              <Hexagon
                width={40}
                y={40}
                x={0}
                fill={short ? getColor({ color: 'secondary4' }) : 'transparent'}
                stroke={getColor({ color: 'base8' })}
                bottomLeftOffset={0}
                bottomTopOffset={0}
              />
            </Svg>
          </SvgWrapper>
          {size !== 's' && <Label>{value}</Label>}
        </Wrapper>
        <CatalystHeaderTitle>
          {size === 'm' && 'Catalyst Potential'}
          {size === 'l' && 'Impact'}
        </CatalystHeaderTitle>
      </div>
    </ThemeProvider>
  );
};

export default Impact;
