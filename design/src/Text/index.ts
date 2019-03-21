import invariant from 'invariant'
import { colorMixin } from '../Colors';
import { s } from '../utils/s';
import { fontFamilies, fontWeights } from './fontConfig';
import { nativeFonts } from './nativeFonts';
import {
  normalizeFontSize,
  normalizeGetFontFamily,
  normalizeColor,
  normalizeFontWeight,
} from './normalizers';

export * from './fontConfig';
export * from './nativeFonts';

export const inter = `
  font-family: 'Inter', sans-serif;
  @supports (font-variation-settings: normal) {
    font-family: 'Inter var', sans-serif;
  }
  font-feature-settings: 'case' 1, 'ss01' 1, 'zero' 1, 'frac' 1, 'tnum' 1 ;
`;

const validTextArgs = [
  'fontSize',
  'color',
  'fontFamily',
  'opacity',
  'fontWeight',
];

interface TextArgs {
  fontSize: string | number;
  fontFamily: string;
  color: string;
  opacity: string | number;
  fontWeight: string | number;
};
const keys = Object.keys as <T>(o: T) => (Extract<keyof T, string>)[]
const entries = Object.entries as <T>(o: T) => [(Extract<keyof T, string>), string][]

const parseTextArgs = (inputArgs: Partial<TextArgs>, defaults: TextArgs): TextArgs => {
  const result = entries(defaults).reduce((result, [key, defaultValue]) => {
    invariant(
      validTextArgs.includes(key),
      `key must be one of ${validTextArgs.join(', ')}`
    );
    if (!inputArgs) {
      throw new Error('wef');
    }
    let inputOrDefault = inputArgs[key];
    if (typeof inputOrDefault === 'undefined') {
      inputOrDefault = defaultValue;
    }
    inputOrDefault = inputOrDefault.toString();
    switch (key) {
      case 'fontSize':
        result[key] = normalizeFontSize(inputOrDefault);
        break;
      case 'fontFamily':
        result[key] = normalizeGetFontFamily(inputOrDefault);
        break;
      case 'color':
        result[key] = normalizeColor(inputOrDefault);
        break;
      case 'opacity':
        result[key] = inputOrDefault;
        break;
      case 'fontWeight':
        result[key] = normalizeFontWeight(inputOrDefault);
        break;
    }
    return result;
  }, {} as TextArgs);
  return result;
};

type fontArgs = {
  key: string
  fontWeight?: string
  fontStyle?: string
  native?: boolean
}

export const getNativeFont = ({
  key,
  fontWeight = '400',
  fontStyle = 'normal',
}: fontArgs) => {
  const fontKeys = Object.keys(fontFamilies);
  invariant(
    fontKeys.includes(key),
    `you must provide a valid key, one of ${fontKeys.join(',')}`
  );
  invariant(
    ['normal', 'italic'].includes(fontStyle),
    'font style must be one of normal or italic'
  );
  const font = normalizeGetFontFamily(key);

  const weights = nativeFonts[font];
  const fontWeightValue = normalizeFontWeight(fontWeight);
  invariant(
    weights[fontWeightValue],
    `${fontWeight} is an invalid font weight for ${font}`
  );
  const fontFamily = weights[fontWeightValue][fontStyle].fontFamilyName;
  return fontFamily;
}

export const fontMixin = ({
  key,
  fontWeight = '400',
  fontStyle = 'normal',
  native = navigator.product === 'ReactNative' ? true : false,
}: fontArgs) => {
  const fontKeys = Object.keys(fontFamilies);
  invariant(
    fontKeys.includes(key),
    `you must provide a valid key, one of ${fontKeys.join(',')}`
  );
  const font = normalizeGetFontFamily(key);

  if (native) {
    const fontFamily = getNativeFont({
      key, fontWeight, fontStyle
    });
    return `font-family: ${fontFamily};`;
  }

  if (font === 'primary') {
    return inter;
  }
  return `font-family: ${fontFamilies.secondary};`;
};



type textMixinInputType = {
  fontSize?: number | string
  fontFamily?: string
  color?: string
  opacity?: number | string
  fontWeight?: number | string
};

const primaryDefaults = {
  fontSize: '16',
  fontFamily: fontFamilies.primary,
  color: 'primary4',
  opacity: '1',
  fontWeight: '400',
};


export const primaryTextMixin = (input: textMixinInputType = primaryDefaults) => {
  const p: TextArgs = parseTextArgs(
    input,
    primaryDefaults
  );

  return s.css`
    ${fontMixin({ key: p.fontFamily, fontWeight: p.fontWeight.toString() })};
    ${colorMixin({ color: p.color, opacity: Number(p.opacity) })};
    font-size: ${p.fontSize}px;
    font-weight: 400;
  `;
};

const secondaryDefaults = {
  fontSize: '24',
  fontFamily: fontFamilies.secondary,
  color: 'primary4',
  opacity: '1',
  fontWeight: '200'
};

export const secondaryTextMixin = (input: textMixinInputType = secondaryDefaults) => {
  const p = parseTextArgs(
    input,
    secondaryDefaults,
  );

  return s.css`
    ${fontMixin({ key: p.fontFamily })};
    ${colorMixin({ color: p.color, opacity: Number(p.opacity) })};
    font-size: ${p.fontSize}px;
    text-transform: uppercase;
  `;
};
