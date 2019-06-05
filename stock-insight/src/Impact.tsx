/**
 * @class CatalystPotential
 */

import styled, { ThemeProvider } from 'styled-components';
import * as React from 'react';
import { primaryTextMixin, getColor, s } from '@rdey/design';
import Polygon from './Polygon';
import Hexagon from './Hexagon';
import { Size } from './types';
import { CatalystHeaderTitle } from './components';

const { css } = s;

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
};

const sizeMixin = ({
  theme: { size },
}: {
  theme: {
    size: Size,
  },
}) => {
  if (size === 'l') {
    return makeCss(88, 72);
  } else if (size === 'm') {
    return makeCss(50, 39);
  } else if (size === 's') {
    return makeCss(31, 24);
  }
  return '';
};

const Svg =
  styled.svg <
  { short?: boolean;
mid?: boolean;
long?: boolean;
 } >
  `
  ${sizeMixin};
  #minor, #moderate, #major {
    opacity: 0.16;
  }
  ${({ short, mid, long }) => {
    let totalCss = '';
    if (short) {
      totalCss += css`
        #minor {
          opacity: 1;
        }
      `;
    }
    if (mid) {
      totalCss += css`
        #minor,
        #moderate {
          opacity: 1;
        }
      `;
    }
    if (long) {
      totalCss += css`
        #minor,
        #moderate,
        #major {
          opacity: 1;
        }
      `;
    }
    return totalCss;
  }};
`;

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
  console.log(value);
  return (
    <ThemeProvider theme={{ size }}>
      <div css="display: inline-block;">
        <Wrapper>
          <SvgWrapper>
            <Svg
              width="94"
              height="73"
              viewBox="0 0 94 73"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              short={short}
              mid={mid}
              long={long}
            >
              <g
                transform="translate(.648 .133)"
                fill="#FFF"
                fillRule="nonzero"
                id="impact"
              >
                <polygon
                  id="moderate"
                  points="20.0180625 24.0003 8.9070625 44.0003 20.0180625 44.0003 22.3720625 44.0003 23.5150625 46.0573 30.1820625 58.0573 31.2610625 60.0003 30.1820625 61.9423 24.5940625 72.0003 46.6850625 72.0003 60.0180625 47.9993 46.6850625 24.0003"
                />
                <polygon
                  id="major"
                  points="33.3515625 0 22.2405625 20 46.6845625 20 49.0385625 20 50.1815625 22.057 63.5145625 46.057 64.5945625 48 63.5145625 49.943 51.2605625 72 73.3515625 72 93.3515625 36 73.3515625 0"
                />
                <polygon
                  id="minor"
                  points="6.6854625 47.9997 0.0184625 60.0007 6.6854625 71.9997 20.0184625 71.9997 26.6854625 60.0007 20.0184625 47.9997"
                />
              </g>
            </Svg>
          </SvgWrapper>
          {size !== 's' && <Label>{value}</Label>}
        </Wrapper>
        {size === 'l' && <CatalystHeaderTitle>Impact</CatalystHeaderTitle>}
      </div>
    </ThemeProvider>
  );
};

export default Impact;
