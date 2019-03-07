import styled from 'styled-components';
import * as grid from './Grid';
import {
  colorMixin,
  fontFamilies,
  fontMixin,
  fontSizes,
  parseTextArgs,
} from './Text';
import colors from './Colors';

export * from './Grid';

const s = {
  css: (...args) => {
    const parts = args.slice(1);
    const c = args[0].reduce((css, chunk, index) => {
      if (index > 0) {
        return css + parts[index - 1] + chunk;
      }
      return css + chunk;
    }, '');
    return c;
  },
};

const rdeyDesign = {
  colors,
  grid,
  fontSizes,
  fontFamilies,
  mixins: {
    text: {
      fontMixin,
      colorMixin,
      primary: (args) => {
        const {
          fontSize, fontFamily, color, opacity,
        } = parseTextArgs(args, {
          fontSize: 16,
          fontFamily: fontFamilies.primary,
          color: 'primary4',
          opacity: 1,
        });

        return s.css`
          ${fontMixin(fontFamily)};
          ${colorMixin({ color, opacity })};
          font-size: ${fontSize}px;
          font-weight: 400;
        `;
      },
      secondary: (args) => {
        const {
          fontSize, fontFamily, color, opacity,
        } = parseTextArgs(args, {
          fontSize: 24,
          fontFamily: fontFamilies.secondary,
          color: 'primary4',
          opacity: 1,
        });

        return s.css`
          ${fontMixin(fontFamily)};
          ${colorMixin({ color, opacity })};
          font-size: ${fontSize}px;
          font-weight: 200;
          text-transform: uppercase;
        `;
      },
    },
  },
};

export default rdeyDesign;

export const primaryTextMixin = rdeyDesign.mixins.text.primary;
export const secondaryTextMixin = rdeyDesign.mixins.text.secondary;
