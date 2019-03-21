import invariant from 'invariant';
import { fontSizes, fontFamilies, fontWeights } from './fontConfig';
import { colors } from '../Colors';

export const normalizeFontSize = (fontSize: string) => {
  invariant(
    fontSizes.includes(fontSize),
    `fontSize must be one of ${fontSizes.join(', ')}`
  );
  return fontSize;
};

export const normalizeGetFontFamily = (fontFamily: string) => {
  const storeKeys = Object.keys(fontFamilies);
  const storeValues = Object.values(fontFamilies);
  invariant(
    [...storeKeys, ...storeValues].includes(fontFamily),
    `fontFamliy must be one of ${JSON.stringify(fontFamilies, null, 2)}`
  );
  if (storeValues.includes(fontFamily)) {
    return storeKeys[storeValues.indexOf(fontFamily)];
  }
  return fontFamily;
};

export const normalizeColor = (color: string) => {
  invariant(
    Object.keys(colors).includes(color),
    `the color ${color} must be a string matching one of ${Object.keys(
      colors
    ).join(',')}`
  );
  return color;
};

export const normalizeFontWeight = (fontWeight: string) => {
  const keys = Object.keys(fontWeights);
  if (keys.includes(fontWeight.toString())) {
    return fontWeights[fontWeight];
  }
  if (Object.values(fontWeights).includes(fontWeight)) {
    return fontWeight;
  }
  throw new Error(fontWeight + ' is invalid');
};
