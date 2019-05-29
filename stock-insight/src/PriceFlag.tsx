import { colors, primaryTextMixin } from '@rdey/design';
import { reverse } from 'lodash-es';
import * as React from 'react';
import styled from 'styled-components';

import { AbsoluteWrapper, Title } from './components';
import { usePriceToX, useValues } from './Context';
import { flagPoleHeights, flagHeights, flagPositionTops, priceFontSizes, priceFontWeights, flagWrapperHeights } from './fairValueRangeTheme';

const Wrapper = styled.div`
  position: relative;
  height: ${({ theme: { size } }) => flagWrapperHeights[size]}px;
`;

const LabelWrapper = styled.div`
  height: 100%;
`;


const Price = styled.div`
  ${primaryTextMixin({
    fontWeight: 'normal',
    color: 'secondary4',
  })};

  font-size: ${({ theme: { size }}) => priceFontSizes[size]}px;
  font-weight: ${({ theme: { size }}) => priceFontWeights[size]}px;
`;

const FlagWrapper = styled.div`
  display: flex;
`;

const Flag = styled.div`
  height: ${({ theme: { size }}) => flagHeights[size]}px;
  background-color: ${colors.secondary4.hslCss};
`;

const FlagPole = styled.div`
  width: 1px;
  background-color: ${colors.secondary4.hslCss};
  height: ${({ theme: { size } }) => flagPoleHeights[size]}px;
`;

const FlagPosition = styled(AbsoluteWrapper)<{left: number}>`
  left: ${({ left }) => left}px;
  top: ${({ theme: { size } }) => flagPositionTops[size]}px;
`;

const PriceFlag = () => {
  const { base, price, width, size } = useValues();

  let direction = 'left';
  if (price === base) {
    direction = 'center';
  } else if (price > base) {
    direction = 'right';
  }

  let flag = [usePriceToX(price), usePriceToX(base)];
  const flagWidth = Math.abs(flag[1] - flag[0]);

  let labelPositionCss = `left: ${flag[0]}px`;
  let flagPoleCss = 'margin-left: -1px;';

  if (direction === 'right') {
    flag = reverse(flag);
    labelPositionCss = `right: ${width - flag[1]}px`;
    flagPoleCss = 'margin-right: -1px;';
  }
  if (direction === 'center') {
    labelPositionCss = `width: 100%; left: ${flag[0]}px; margin-left: -50%;`;
  }

  let flagParts = [
    <Flag
      key="flag"
      css={`
        width: ${flagWidth}px;
      `}
    />,
    <FlagPole key="flagPole" css={flagPoleCss} />,
  ];

  if (direction === 'right') {
    flagParts = reverse(flagParts);
  }


  return (
    <Wrapper>
      {size !== 's' && (
        <AbsoluteWrapper
          css={`
            ${labelPositionCss};
          `}
        >
          <LabelWrapper
            css={`
              text-align: ${direction};
            `}
          >
            {size === 'l' && <Title css="margin-bottom: 4px;">Last Price</Title>}
            <Price>{price.toFixed(1)}</Price>
          </LabelWrapper>
        </AbsoluteWrapper>
      )}
      <FlagPosition left={flag[0]}>
        <FlagWrapper>{flagParts}</FlagWrapper>
      </FlagPosition>
    </Wrapper>
  );
};

export default PriceFlag;
