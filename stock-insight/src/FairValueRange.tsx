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

export type Props = {
  bear: number,
  base: number,
  bull: number,
  price: number,
  size: 's' | 'm' | 'l';
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

const IndicatorPadding = styled.div`
  padding: 16px ${6 + 24}px 24px ${6 + 24}px;
`;

const Relative = styled.div`
  position: relative;
  height: ${({ theme: { size }}) => fairValueRangeHeights[size]}px;
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
`;


const IndicatorEnvironment = ({ bull, bear, base, price, size }: Props) => {
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
        <IndicatorPadding>
          <IndicatorWrapper ref={wrapperRef}>
            {rect && <Indicator />}
          </IndicatorWrapper>
        </IndicatorPadding>
      </Styling>
      </ThemeProvider>

    </Context.Provider>
  );
};

const FairValueRange = (props: Props) => {
  const { bear, base, bull, price, size } = props;

  return (
    <IndicatorEnvironment bear={bear} base={base} bull={bull} price={price} size={size} />
  );
};

export default FairValueRange;
