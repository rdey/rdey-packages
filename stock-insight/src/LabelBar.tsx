import * as React from 'react';
import styled from 'styled-components';
import { usePriceToX, useValues } from './Context';
import Position from './Position';
import { labelBarWrapperPaddingTops, labelBarHeights } from './fairValueRangeTheme';

const useClientRect = () => {
  const [rect, setRect] = React.useState<ClientRect | DOMRect | null>(null);
  const mutNode = React.useRef<null | HTMLElement>(null);
  const ref = React.useCallback((node: null | HTMLElement) => {
    mutNode.current = node;
    if (node) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref, mutNode.current] as const;
}

const Wrapper = styled.div`
  position: relative;
  left: 0;
  right: 0;
  box-sizing: content-box;
  height: ${({ theme: { size }}) => labelBarHeights[size]}px;
  padding-top: ${({ theme: { size }}) => labelBarWrapperPaddingTops[size]}px;
`;

type Args = {
  bear: number,
  base: number,
  bull: number,
  bearRect: ClientRect | DOMRect | null,
  baseRect: ClientRect | DOMRect | null,
  bullRect: ClientRect | DOMRect | null,
}

type Direction = 'left' | 'right';

const useCalculateDirections = ({
  bear,
  base,
  bull,
  bearRect,
  baseRect,
  bullRect,
}: Args) => {
  const bearDirection = 'left' as const;
  let baseDirection = 'left' as Direction;
  const bullDirection = 'right' as const;

  const bearLeft = usePriceToX(bear);
  const baseLeft = usePriceToX(base);
  const bullLeft = usePriceToX(bull);
  let hideBull = false;
  let hideBear = false;

  if (!bearRect || !baseRect || !bullRect) {
    return {
      bearDirection,
      baseDirection,
      bullDirection,
      hideBull,
      hideBear,
    };
  }

  if (baseRect.width + baseLeft >= bullLeft - bullRect.width) {
    baseDirection = 'right';
  }

  if (baseDirection === 'right') {
    if (bearLeft + bearRect.width >= baseLeft - baseRect.width) {
      hideBear = true;
    }
    if (baseLeft >= bullLeft - bullRect.width) {
      hideBull = true;
    }
  } else {
    if (bearLeft + baseRect.width >= baseLeft - 12) {
      hideBear = true;
    }
    if (baseLeft >= bullLeft - 12) {
      hideBull = true;
    }
  }

  return {
    bearDirection,
    baseDirection,
    bullDirection,
    hideBull,
    hideBear,
  };
};

const LabelBar = () => {
  const { bear, base, bull } = useValues();
  const [bearRect, bearRef] = useClientRect();
  const [baseRect, baseRef] = useClientRect();
  const [bullRect, bullRef] = useClientRect();

  const {
    hideBear,
    hideBull,
    bearDirection,
    baseDirection,
    bullDirection,
  } = useCalculateDirections({
    bear,
    base,
    bull,
    bearRect,
    baseRect,
    bullRect,
  });

  return (
    <Wrapper>
      <Position
        value={bear}
        ref={bearRef}
        direction={bearDirection}
        hide={hideBear}
      >
        Bear
      </Position>
      <Position
        value={base}
        ref={baseRef}
        direction={baseDirection}
        hidePrice={hideBear || hideBull}
      >
        Base
      </Position>
      <Position
        value={bull}
        ref={bullRef}
        direction={bullDirection}
        hide={hideBull}
      >
        Bull
      </Position>
    </Wrapper>
  );
};
export default LabelBar;
