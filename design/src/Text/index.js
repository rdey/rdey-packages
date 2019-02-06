import styled from 'styled-components';
import fromPairs from 'lodash/fromPairs';

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
`;

export const styles = [
  {
    name: 'display56M',
    id: 'display-56-m',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },
  {
    name: 'display56MU',
    id: 'display-56-m-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },
  {
    name: 'display56R',
    id: 'display-56-r',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },
  {
    name: 'display56RU',
    id: 'display-56-r-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },

  {
    name: 'display56L',
    id: 'display-56-l',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },
  {
    name: 'display56LU',
    id: 'display-56-l-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
  },
  {
    name: 'display40M',
    id: 'display-40-m',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'display40MU',
    id: 'display-40-m-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'display40R',
    id: 'display-40-r',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'display40RU',
    id: 'display-40-r-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'display40LU',
    id: 'display-40-l-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'titlesDisplay40L',
    id: 'titles/display-40-l',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
  },
  {
    name: 'header32M',
    id: 'header-32-m',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersUppercaseHeader32MU',
    id: 'headers/uppercase/header-32-m-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersHeader32R',
    id: 'headers/header-32-r',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersUppercaseHeader32RU',
    id: 'headers/uppercase/header-32-r-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersHeader32L',
    id: 'headers/header-32-l',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersUppercaseHeader32LU',
    id: 'headers/uppercase/header-32-l-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'headersHeader28M',
    id: 'headers/header-28-m',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader28MU',
    id: 'headers/uppercase/header-28-m-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersHeader28R',
    id: 'headers/header-28-r',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader28RU',
    id: 'headers/uppercase/header-28-r-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersHeader28L',
    id: 'headers/header-28-l',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader28LU',
    id: 'headers/uppercase/header-28-l-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersHeader24M',
    id: 'headers/header-24-m',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader24MU',
    id: 'headers/uppercase/header-24-m-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersHeader24R',
    id: 'headers/header-24-r',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader24RU',
    id: 'headers/uppercase/header-24-r-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersHeader24L',
    id: 'headers/header-24-l',
    css: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'headersUppercaseHeader24LU',
    id: 'headers/uppercase/header-24-l-u',
    css: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
  },
  {
    name: 'bodyBody20',
    id: 'body/body-20',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
    `,
  },
  {
    name: 'subtitlesSubtitle16',
    id: 'subtitles/subtitle-16',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${bold};
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.5px;
    `,
  },
  {
    name: 'bodyBody16',
    id: 'body/body-16',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.5px;
    `,
  },
  {
    name: 'otherButton14',
    id: 'other/button-14',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0.75px;
    `,
  },
  {
    name: 'subtitlesSubtitle14',
    id: 'subtitles/subtitle-14',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.5px;
    `,
  },
  {
    name: 'bodyBody14',
    id: 'body/body-14',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.25px;
    `,
  },
  {
    name: 'otherButton12',
    id: 'other/button-12',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 1px;
    `,
  },
  {
    name: 'otherCaption12',
    id: 'other/caption-12',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${regular};
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
    `,
  },
  {
    name: 'otherOverline10',
    id: 'other/overline-10',
    css: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 10px;
      line-height: 10px;
      letter-spacing: 0.5px;
    `,
  },
  {
    name: 'otherTabular09',
    id: 'other/tabular-09',
    css: (tag) => styled[tag]`
      font-family: ${inter};
      font-weight: ${regular};
      font-size: 9px;
      line-height: 9px;
      letter-spacing: 1px;
    `,
  },
];

const styleDict = fromPairs(styles.map((p) => [p.id, p]));

export const display56M = styleDict['display-56-m'];
export const display56MU = styleDict['display-56-m-u'];
export const display56R = styleDict['display-56-r'];
export const display56RU = styleDict['display-56-r-u'];
export const display56L = styleDict['display-56-l'];
export const display56LU = styleDict['display-56-l-u'];
export const display40M = styleDict['display-40-m'];
export const display40MU = styleDict['display-40-m-u'];
export const display40R = styleDict['display-40-r'];
export const display40RU = styleDict['display-40-r-u'];
export const display40LU = styleDict['display-40-l-u'];
export const titlesDisplay40L = styleDict['titles/display-40-l'];
export const header32M = styleDict['header-32-m'];
export const headersUppercaseHeader32MU = styleDict['headers/uppercase/header-32-m-u'];
export const headersHeader32R = styleDict['headers/header-32-r'];
export const headersUppercaseHeader32RU = styleDict['headers/uppercase/header-32-r-u'];
export const headersHeader32L = styleDict['headers/header-32-l'];
export const headersUppercaseHeader32LU = styleDict['headers/uppercase/header-32-l-u'];
export const headersHeader28M = styleDict['headers/header-28-m'];
export const headersUppercaseHeader28MU = styleDict['headers/uppercase/header-28-m-u'];
export const headersHeader28R = styleDict['headers/header-28-r'];
export const headersUppercaseHeader28RU = styleDict['headers/uppercase/header-28-r-u'];
export const headersHeader28L = styleDict['headers/header-28-l'];
export const headersUppercaseHeader28LU = styleDict['headers/uppercase/header-28-l-u'];
export const headersHeader24M = styleDict['headers/header-24-m'];
export const headersUppercaseHeader24MU = styleDict['headers/uppercase/header-24-m-u'];
export const headersHeader24R = styleDict['headers/header-24-r'];
export const headersUppercaseHeader24RU = styleDict['headers/uppercase/header-24-r-u'];
export const headersHeader24L = styleDict['headers/header-24-l'];
export const headersUppercaseHeader24LU = styleDict['headers/uppercase/header-24-l-u'];
export const bodyBody20 = styleDict['body/body-20'];
export const subtitlesSubtitle16 = styleDict['subtitles/subtitle-16'];
export const bodyBody16 = styleDict['body/body-16'];
export const otherButton14 = styleDict['other/button-14'];
export const subtitlesSubtitle14 = styleDict['subtitles/subtitle-14'];
export const bodyBody14 = styleDict['body/body-14'];
export const otherButton12 = styleDict['other/button-12'];
export const otherCaption12 = styleDict['other/caption-12'];
export const otherOverline10 = styleDict['other/overline-10'];
export const otherTabular09 = styleDict['other/tabular-09'];