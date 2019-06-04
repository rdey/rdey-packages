/**
 * @class CatalystPotential
 */

import styled, { ThemeProvider } from 'styled-components';
import * as React from 'react';
import { primaryTextMixin } from '@rdey/design';
import Polygon from './Polygon';
import Hexagon from './Hexagon';
import { Size } from './types';
import Impact from './Impact';
import Timeframe from './Timeframe';
import { CatalystHeaderTitle, ComponentTitle } from './components';

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
  })};
  line-height: 1;
`;

type Values = 0 | 1 | 2 | 3;

type Catalyst = {
  comment: string,
  id: string,
  negativeLikelihood: Values,
  negativePotency: Values,
  positiveLikelihood: Values,
  positivePotency: Values,
  publishedAt: string,
  text?: string,
  timeframe: 0 | 1 | 2,
  title: string,
  updatedAt: string,
};
export type Catalysts = Catalyst[];
type Props = {
  size: Size,
  catalysts: Catalysts,
  className?: string,
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  ${({ theme: { size } }) => size === 'm' && 'padding-bottom: 16px'};
  ${({ theme: { size } }) => size === 'l' && 'padding-bottom: 24px'};
`;

const CatalystPotential = ({ size, catalysts, className }: Props) => {
  const impactStrength = (
    potency: 1 | 2 | 3,
    {
      negativePotency,
      positivePotency,
      negativeLikelihood,
      positiveLikelihood,
    }: Catalyst
  ) => {
    let strength = 0;
    if (negativePotency === potency) {
      strength += negativeLikelihood;
    }
    if (positivePotency === potency) {
      strength += positiveLikelihood;
    }
    return strength;
  };

  const timeframeStrength = (ref: 0 | 1 | 2, { timeframe }: Catalyst) => {
    let strength = 0;
    if (timeframe === ref) {
      strength += timeframe;
    }
    if (timeframe === ref) {
      strength += timeframe;
    }
    return strength;
  };

  let impact = 0;
  let timeframe: 0 | 1 | 2 = 0;
  let minorImpactStrength = 0;
  let moderateImpactStrength = 0;
  let majorImpactStrength = 0;
  let minorTimeframeStrength = 0;
  let moderateTimeframeStrength = 0;
  let majorTimeframeStrength = 0;
  catalysts.forEach((props) => {
    minorImpactStrength += impactStrength(1, props);
    moderateImpactStrength += impactStrength(2, props);
    majorImpactStrength += impactStrength(3, props);

    minorTimeframeStrength += timeframeStrength(0, props);
    moderateTimeframeStrength += timeframeStrength(1, props);
    majorTimeframeStrength += timeframeStrength(2, props);
  });
  const maxImpact = Math.max(
    minorImpactStrength,
    moderateImpactStrength,
    majorImpactStrength
  );
  const maxTimeframe = Math.max(
    minorTimeframeStrength,
    moderateTimeframeStrength,
    majorTimeframeStrength
  );

  if (maxImpact === minorImpactStrength) {
    impact = 1;
  } else if (maxImpact === moderateImpactStrength) {
    impact = 2;
  } else if (maxImpact === majorImpactStrength) {
    impact = 3;
  }

  if (maxTimeframe === minorTimeframeStrength) {
    timeframe = 0;
  } else if (maxTimeframe === moderateTimeframeStrength) {
    timeframe = 1;
  } else if (maxTimeframe === majorTimeframeStrength) {
    timeframe = 2;
  }
  return (
    <ThemeProvider theme={{ size }}>
      <div className={className}>
        <div>
          <Wrapper>
            <Impact
              size={size}
              short={impact >= 1}
              mid={impact >= 2}
              long={impact >= 3}
              value={catalysts.length}
            />
            {size === 'l' && (
              <>
                <div style={{ width: '2em' }} />
                <div>
                  <Timeframe
                    timeframe={timeframe}
                    width={72}
                    height={40}
                    size={size}
                  />
                  <CatalystHeaderTitle>Timeframe</CatalystHeaderTitle>
                </div>
              </>
            )}
          </Wrapper>
          {size !== 's' && <ComponentTitle>Catalyst Potential</ComponentTitle>}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CatalystPotential;
