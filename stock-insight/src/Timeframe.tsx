import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getColor } from '@rdey/design';
import { Size } from './types';

const makeCss = (width: number, height: number) => {
  return `
    width: ${width}px;
    height: ${height}px;
  `;
};

const Wrapper = styled.div<{ highlight?: boolean }>`
  background-color: ${({ highlight }) =>
    highlight
      ? getColor({ color: 'secondary4', opacity: 1 })
      : getColor({ color: 'secondary4', opacity: 0.16 })};
  border: 0px solid rgba(0, 0, 0, 0.25);
  border-top-width: 1px;
  border-right-width: 1px;
  display: flex;
  align-items: flex-end;
  transition: opacity 0.25s ease;
  cursor: pointer;
`;

type Props = {
  width: number;
  height: number;
  timeframe: 0 | 1 | 2;
  size: Size;
}

const Timeframe = ({ width, height, timeframe, size }: Props) => {
  return (
    <ThemeProvider theme={{ size }}>
      <Wrapper css={`${makeCss(width, height)}; border: 0px;`} highlight={timeframe === 2}>
        <Wrapper
          highlight={timeframe === 1}
          css={makeCss(
            (width * 48) / 72,
            Math.min((height * 32) / 40, height - 8)
          )}
        >
          <Wrapper
            highlight={timeframe === 0}
            css={makeCss(
              (width * 32) / 72,
              Math.min((height * 24) / 40, height - 16)
            )}
          />
        </Wrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Timeframe;
