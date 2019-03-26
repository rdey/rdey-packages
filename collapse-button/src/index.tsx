/**
 * @class ExampleComponent
 */

import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

export type Props = {
  active: boolean,
  size: number,
  borderWidth: number,
  colorLeft: string,
  colorRight: string,
  cssLeft: string,
  cssRight: string,
};

type Theme = {
  active: boolean,
  size: number,
  borderWidth: number,
  colorLeft: string,
  colorRight: string,
};

type StyledProps = {
  theme: Theme,
  styling: string,
};

const getSizes = ({ size }: Theme) => {
  const rotatedWidth = Math.sqrt(2 * (size / 2) ** 2) * 2;
  const normalizeWidth = rotatedWidth / 2 - size / 2;
  const marginTop = (rotatedWidth - rotatedWidth * 0.5) / 2;

  return {
    rotatedWidth,
    normalizeWidth,
    marginTop,
  };
};

const getStyle = ({
  theme,
  theme: { active, size, borderWidth, colorLeft, colorRight },
}: StyledProps) => {
  const { rotatedWidth, normalizeWidth, marginTop } = getSizes(theme);

  return `box-sizing: border-box;
    width: ${size}px;
    height: ${size}px;
    position: absolute;
    left: 0;
    top: 0;

    border-style: solid;
    border-width: 0;
    transition: transform 0.5s ease;

    :first-child {
      transform: translate(${normalizeWidth}px, ${-normalizeWidth * 2 +
    marginTop}px) rotate(45deg);
      border-bottom-width: ${borderWidth}px;
      border-right-width: ${borderWidth}px;
      border-bottom-color: ${colorLeft};
      border-right-color: ${colorLeft};
    }
    :last-child {
      transform: translate(${normalizeWidth +
        0.75 * rotatedWidth}px, ${normalizeWidth + marginTop}px) rotate(${180 +
    45}deg);
      border-bottom-width: ${borderWidth}px;
      border-right-width: ${borderWidth}px;
      border-bottom-color: ${colorRight};
      border-right-color: ${colorRight};
    }

    ${
      active
        ? `
    :first-child {
      transform: translate(${normalizeWidth +
        0.75 * rotatedWidth}px, ${normalizeWidth + marginTop}px) rotate(${45 +
            180}deg);
    }
    :last-child {
      transform: translate(${normalizeWidth}px, ${normalizeWidth -
            marginTop}px) rotate(${180 + 45 + 180}deg);
    }
    `
        : ''
    };

  `;
};

const Box =
  styled.div <
  StyledProps >
  `
  ${getStyle};
  ${({ styling }) => styling};
`;

const BoxContainer = styled.div`
  display: flex;
  height: ${({ theme }) => getSizes(theme).rotatedWidth}px;
  position: relative;
`;

class CollapseButton extends React.PureComponent<Props> {
  render() {
    const {
      active = false,
      size = 16,
      cssLeft = '',
      cssRight = '',
      borderWidth = 1,
      colorLeft = '#000000',
      colorRight = '#000000',
    } = this.props;
    return (
      <ThemeProvider theme={{ active, size, borderWidth, colorLeft, colorRight }}>
        <BoxContainer>
          <Box styling={cssLeft} />
          <Box styling={cssRight} />
        </BoxContainer>
      </ThemeProvider>
    );
  }
}

export default CollapseButton;
