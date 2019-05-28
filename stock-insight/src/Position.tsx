import * as React from 'react';
import { reverse } from 'lodash-es';

import styled from 'styled-components';
import { getColor, primaryTextMixin } from '@rdey/design';
import { useValues, usePriceToX } from './Context';
import { Title } from './components';
import { triangleSizes } from './fairValueRangeTheme';

const Wrapper = styled.div`
  position: absolute;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: ${({ theme: { size } }) => `0 ${triangleSizes[size][0]}px ${triangleSizes[size][1]}px ${triangleSizes[size][0]}px`};
  border-color: transparent transparent
    ${getColor({ color: 'secondary4', opacity: 0.56 })} transparent;
`;

type DirectionProps = {
  direction: 'left' | 'right',
};

const triangleWrapperHeights = {
  l: 10,
  m: 4,
  s: 4,
};

const Top =
  styled.div <
    DirectionProps >
    `
  display: flex;
  align-items: center;
  height: ${({ theme: { size } }) => triangleWrapperHeights[size]}px;
  justify-content: ${({ direction }) =>
      direction === 'left' ? 'flex-start' : 'flex-end'};
`;

const Price = styled.div`
  ${primaryTextMixin({
  color: 'secondary4',
})};
`;

type Props = {
  value: number,
  children: React.ReactNode,
  direction: 'left' | 'right',
  hide?: boolean,
  hidePrice?: boolean,
};

const Position = React.forwardRef(
  (
    { value, children, direction, hide, hidePrice }: Props,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { width, size } = useValues();
    const valueX = usePriceToX(value);

    const triangleHalfWidth = triangleSizes[size][0];

    let wrapperCss = `left: ${valueX - triangleHalfWidth}px;`;
    let topChildren = [
      <Triangle key="triangle" />,
      !hide && size === 'l' && (
        <Title css={`margin-${direction}: 4px; line-height: 1;`} key="title">
          {children}
        </Title>
      ),
    ];

    if (direction === 'right') {
      topChildren = reverse(topChildren);
      wrapperCss = `right: ${width - (valueX + triangleHalfWidth)}px;`;
    }

    return (
      <Wrapper css={wrapperCss} ref={ref}>
        <Top direction={direction}>{topChildren}</Top>
        {!hidePrice && size === 'l' && <Price>{value.toFixed(2)}</Price>}
      </Wrapper>
    );
  }
);
export default Position;
