/**
 * @class FairValueRange
 */

import styled, { ThemeProvider } from 'styled-components';
import * as React from 'react';
import { Context } from './Context';
import PriceFlag from './PriceFlag';
import BearToBullLine from './BearToBullLine';
import LabelBar from './LabelBar';
import { fairValueRangeHeights } from './fairValueRangeTheme';
import { ComponentTitle } from './components';
import { clickable } from './mixins';
import { triangleSizes } from './fairValueRangeTheme';

export type FairValueRangeProps = {
  bear: number,
  base: number,
  bull: number,
  price: number,
  size: 's' | 'm' | 'l';
  className?: string;
  onClick?: () => any;
  hideTitle?: boolean;
};

const useResize = (cb: () => any) => {
  React.useEffect(() => {
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, [cb]);
};

const useResponsiveClientRect = () => {
  const [rect, setRect] = React.useState<ClientRect | DOMRect | null>(null);
  const ref = React.useRef<HTMLElement | null>(null);
  const measure = React.useCallback(
    () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    },
    []
  );

  useResize(measure);

  const refCb: React.Ref<HTMLDivElement> = React.useCallback((el: HTMLDivElement) => {
    ref.current = el;
    measure();
  }, []);

  return [rect, refCb, ref] as const;
};

const IndicatorWrapper = styled.div``;

const bottomPadding = {
  s: 0,
  m: 16,
  l: 24,
}
const IndicatorPadding = styled.div<{hideTitle?: boolean}>`
  padding: ${({ theme: { size }}) => `0 ${triangleSizes[size][0]}px ${bottomPadding[size]}px ${triangleSizes[size][0]}px`};
  width: 100%;
  ${({ hideTitle }) => hideTitle && `
    padding-bottom: 0;
  `};
`;

const Relative = styled.div`
  position: relative;
  height: ${({ theme: { size } }) => fairValueRangeHeights[size]}px;
`;

const Indicator = () => {
  return (
    <Relative>
      <PriceFlag />
      <BearToBullLine />
      <LabelBar />
    </Relative>
  );
};

const Styling = styled.div`
  * {
    box-sizing: border-box;
    line-height: 1;
  }
  flex: 1;
  display: flex;
  align-items: flex-end;
`;


const IndicatorEnvironment = ({ bull, bear, base, price, size, hideTitle }: FairValueRangeProps) => {
  const [rect, wrapperRef] = useResponsiveClientRect();

  const minValue = Math.min(bear, base, bull, price);
  const maxValue = Math.max(bear, base, bull, price);

  const context = {
    bull,
    bear,
    base,
    price,
    width: rect ? rect.width : 0,
    minValue,
    maxValue,
    size
  };


  return (
    <Context.Provider
      value={context}
    >
      <ThemeProvider theme={context}>
        <Styling>
          <IndicatorPadding hideTitle={hideTitle}>
            <IndicatorWrapper ref={wrapperRef}>
              {rect && <Indicator />}
            </IndicatorWrapper>
          </IndicatorPadding>
        </Styling>
      </ThemeProvider>

    </Context.Provider>
  );
};

const FairValueRange = (props: FairValueRangeProps) => {
  const { bear, base, bull, price, size, className, onClick, hideTitle } = props;

  return (
    <ThemeProvider theme={{ size }}>
      <div className={className} onClick={onClick} role="button" tabIndex={0} css={clickable()}>
        <IndicatorEnvironment hideTitle={hideTitle} bear={bear} base={base} bull={bull} price={price} size={size} />
        {size !== 's' && !hideTitle &&(
          <ComponentTitle>Fair Value Range</ComponentTitle>
        )}
      </div>
    </ThemeProvider>
  );
};

export default FairValueRange;
