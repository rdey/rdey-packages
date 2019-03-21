import { colors, getColor, colorMixin } from './Colors';
import * as grid from './Grid';
import {
  fontFamilies,
  fontMixin,
  fontSizes,
  primaryTextMixin,
  secondaryTextMixin,
} from './Text';

export * from './Text';
export * from './Colors';
export * from './Grid';
export * from './utils/s';

export const rdeyDesign = {
  colors,
  grid,
  fontSizes,
  fontFamilies,
  mixins: {
    color: colorMixin,
    font: fontMixin,
    primaryText: primaryTextMixin,
    secondaryText: secondaryTextMixin,
  },
  getColor,
};
