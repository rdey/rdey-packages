export type fontFamiliesType = {
  primary: string,
  secondary: string,
};

export const fontFamilies: fontFamiliesType = {
  primary: 'Inter',
  secondary: 'Oswald',
};

interface FontWeights {
  [key: string]: string;
}

export const fontWeights: FontWeights = {
  thin: '100',
  hairline: '100',
  extraLight: '200',
  ultraLight: '200',
  light: '300',
  regular: '400',
  normal: '400',
  medium: '500',
  semiBold: '600',
  demiBold: '600',
  bold: '700',
  extraBold: '800',
  ultraBold: '800',
  black: '900',
  heavy: '900',
};


export const fontSizes = [
  '56',
  '40',
  '32',
  '28',
  '24',
  '20',
  '16',
  '14',
  '12',
  '10',
  '9,',
];
