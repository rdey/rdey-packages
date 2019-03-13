import invariant from 'invariant';
import has from 'lodash/has';
import colors, { colorMixin } from '../Colors';
import s from '../utils/s';

export const thin = 100;
export const hairline = 100;
export const extraLight = 200;
export const ultraLight = 200;
export const light = 300;
export const regular = 400;
export const normal = 400;
export const medium = 500;
export const semiBold = 600;
export const demiBold = 600;
export const bold = 700;
export const extraBold = 800;
export const ultraBold = 800;
export const black = 900;
export const heavy = 900;

export const inter = `
  font-family: 'Inter', sans-serif;
  @supports (font-variation-settings: normal) {
    font-family: 'Inter var', sans-serif;
  }
  font-feature-settings: 'case' 1, 'ss01' 1, 'zero' 1, 'frac' 1, 'tnum' 1 ;
  
`;

export const fontSizes = [56, 40, 32, 28, 24, 20, 16, 14, 12, 10, 9];
const getFontSize = (fontSize) => {
  invariant(
    fontSizes.includes(fontSize),
    `fontSize must be one of ${fontSizes.join(', ')}`,
  );
  return fontSize;
};

export const fontFamilies = {
  primary: 'Inter',
  secondary: 'Oswald',
};

const getFontFamily = (fontFamily) => {
  const storeKeys = Object.keys(fontFamilies);
  const storeValues = Object.values(fontFamilies);
  invariant(
    [...storeKeys, ...storeValues].includes(fontFamily),
    `fontFamliy must be one of ${JSON.stringify(fontFamilies, null, 2)}`,
  );
  if (storeValues.includes(fontFamily)) {
    return storeKeys[storeValues.indexOf(fontFamily)];
  }
  return fontFamily;
};

const getColor = (color) => {
  invariant(
    Object.keys(colors).includes(color),
    `the color ${color} must be a string matching one of ${Object.keys(
      colors,
    ).join(',')}`,
  );
  return color;
};

const validTextArgs = ['fontSize', 'color', 'fontFamily', 'opacity'];
const parseTextArgs = (inputArgs, parseProps) => {
  const result = {};
  Object.entries(parseProps).forEach(([key, defaultValue]) => {
    invariant(
      validTextArgs.includes(key),
      `key must in in ${validTextArgs.join(', ')}`,
    );
    const input = has(inputArgs, key) ? inputArgs[key] : defaultValue;
    switch (key) {
      case 'fontSize':
        result[key] = getFontSize(input);
        break;
      case 'fontFamily':
        result[key] = getFontFamily(input);
        break;
      case 'color':
        result[key] = getColor(input);
        break;
      case 'opacity':
        result[key] = Number(input);
        break;
      default:
        result[key] = input;
    }
  });
  return result;
};

export const fontMixin = (fontKey) => {
  const fontKeys = Object.keys(fontFamilies);
  invariant(
    fontKeys.includes(fontKey),
    `you must provide a valid fontKey, one of ${fontKeys.join(',')}`,
  );
  const font = getFontFamily(fontKey);
  if (font === 'primary') {
    return inter;
  }
  return `font-family: ${fontFamilies.secondary};`;
};

export const primaryTextMixin = ({
  fontSize, fontFamily, color, opacity,
}) => {
  const p = parseTextArgs(
    {
      fontSize,
      fontFamily,
      color,
      opacity,
    },
    {
      fontSize: 16,
      fontFamily: fontFamilies.primary,
      color: 'primary4',
      opacity: 1,
    },
  );

  return s.css`
    ${fontMixin(p.fontFamily)};
    color: ${colorMixin({ color: p.color, opacity: p.opacity })};
    font-size: ${p.fontSize}px;
    font-weight: 400;
  `;
};

export const secondaryTextMixin = ({
  fontSize,
  fontFamily,
  color,
  opacity,
}) => {
  const p = parseTextArgs(
    {
      fontSize,
      fontFamily,
      color,
      opacity,
    },
    {
      fontSize: 24,
      fontFamily: fontFamilies.secondary,
      color: 'primary4',
      opacity: 1,
    },
  );

  return s.css`
    ${fontMixin(p.fontFamily)};
    color: ${colorMixin({ color: p.color, opacity: p.opacity })};
    font-size: ${p.fontSize}px;
    font-weight: 200;
    text-transform: uppercase;
  `;
};
