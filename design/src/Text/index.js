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
  font-feature-settings: 'case' 1, 'ss01' 1, 'zero' 1, 'frac' 1, 'tnum' 1 ;
  
`;

export const styles = [
  {
    name: 'Display56M',
    id: 'display-56-m',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },
  {
    name: 'Display56MU',
    id: 'display-56-m-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },
  {
    name: 'Display56R',
    id: 'display-56-r',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },
  {
    name: 'Display56RU',
    id: 'display-56-r-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },

  {
    name: 'Display56L',
    id: 'display-56-l',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },
  {
    name: 'Display56LU',
    id: 'display-56-l-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 56px;
      line-height: 60px;
      letter-spacing: -1px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '56px',
      lineHeight: '60px',
      letterSpacing: '-1px',
    },
  },
  {
    name: 'Display40M',
    id: 'display-40-m',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'Display40MU',
    id: 'display-40-m-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'Display40R',
    id: 'display-40-r',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'Display40RU',
    id: 'display-40-r-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'Display40LU',
    id: 'display-40-l-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'TitlesDisplay40L',
    id: 'titles/display-40-l',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 40px;
      line-height: 48px;
      letter-spacing: -0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '40px',
      lineHeight: '48px',
      letterSpacing: '-0.25px',
    },
  },
  {
    name: 'Header32M',
    id: 'header-32-m',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersUppercaseHeader32MU',
    id: 'headers/uppercase/header-32-m-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersHeader32R',
    id: 'headers/header-32-r',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersUppercaseHeader32RU',
    id: 'headers/uppercase/header-32-r-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersHeader32L',
    id: 'headers/header-32-l',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersUppercaseHeader32LU',
    id: 'headers/uppercase/header-32-l-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 32px;
      line-height: 36px;
      letter-spacing: 0.25px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0.25px',
    },
  },
  {
    name: 'HeadersHeader28M',
    id: 'headers/header-28-m',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader28MU',
    id: 'headers/uppercase/header-28-m-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersHeader28R',
    id: 'headers/header-28-r',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader28RU',
    id: 'headers/uppercase/header-28-r-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersHeader28L',
    id: 'headers/header-28-l',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader28LU',
    id: 'headers/uppercase/header-28-l-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 28px;
      line-height: 32px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersHeader24M',
    id: 'headers/header-24-m',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader24MU',
    id: 'headers/uppercase/header-24-m-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${medium};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${medium}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersHeader24R',
    id: 'headers/header-24-r',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader24RU',
    id: 'headers/uppercase/header-24-r-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${regular};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${regular}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersHeader24L',
    id: 'headers/header-24-l',
    sc: (tag) => styled[tag]`
      font-family: Oswald;
      font-weight: ${light};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'HeadersUppercaseHeader24LU',
    id: 'headers/uppercase/header-24-l-u',
    sc: (tag) => styled[tag]`
      text-transform: uppercase;
      font-family: Oswald;
      font-weight: ${light};
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0px;
    `,
    css: {
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: `${light}`,
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0px',
    },
  },
  {
    name: 'BodyBody20',
    id: 'body/body-20',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
    `,
    css: {
      fontWeight: `${light}`,
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'SubtitlesSubtitle16',
    id: 'subtitles/subtitle-16',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${bold};
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.5px;
    `,
    css: {
      fontWeight: `${bold}`,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0.5px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'BodyBody16',
    id: 'body/body-16',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.5px;
    `,
    css: {
      fontWeight: `${light}`,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.5px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'OtherButton14',
    id: 'other/button-14',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0.75px;
    `,
    css: {
      fontWeight: `${medium}`,
      fontSize: '14px',
      lineHeight: '14px',
      letterSpacing: '0.75px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'SubtitlesSubtitle14',
    id: 'subtitles/subtitle-14',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.5px;
    `,
    css: {
      fontWeight: `${medium}`,
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '0.5px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'BodyBody14',
    id: 'body/body-14',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${light};
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.25px;
    `,
    css: {
      fontWeight: `${light}`,
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0.25px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'OtherButton12',
    id: 'other/button-12',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 1px;
    `,
    css: {
      fontWeight: `${medium}`,
      fontSize: '12px',
      lineHeight: '12px',
      letterSpacing: '1px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'OtherCaption12',
    id: 'other/caption-12',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${regular};
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
    `,
    css: {
      fontWeight: `${regular}`,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'OtherOverline10',
    id: 'other/overline-10',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${medium};
      font-size: 10px;
      line-height: 10px;
      letter-spacing: 0.5px;
    `,
    css: {
      fontWeight: `${medium}`,
      fontSize: '10px',
      lineHeight: '10px',
      letterSpacing: '0.5px',
      fontFamily: 'Inter',
    },
  },
  {
    name: 'OtherTabular09',
    id: 'other/tabular-09',
    sc: (tag) => styled[tag]`
      ${inter};
      font-weight: ${regular};
      font-size: 9px;
      line-height: 9px;
      letter-spacing: 1px;
    `,
    css: {
      fontWeight: `${regular}`,
      fontSize: '9px',
      lineHeight: '9px',
      letterSpacing: '1px',
      fontFamily: 'Inter',
    },
  },
];

const styleDict = fromPairs(styles.map((p) => [p.id, p]));

export const Display56M = styleDict['display-56-m'];
export const Display56MU = styleDict['display-56-m-u'];
export const Display56R = styleDict['display-56-r'];
export const Display56RU = styleDict['display-56-r-u'];
export const Display56L = styleDict['display-56-l'];
export const Display56LU = styleDict['display-56-l-u'];
export const Display40M = styleDict['display-40-m'];
export const Display40MU = styleDict['display-40-m-u'];
export const Display40R = styleDict['display-40-r'];
export const Display40RU = styleDict['display-40-r-u'];
export const Display40LU = styleDict['display-40-l-u'];
export const TitlesDisplay40L = styleDict['titles/display-40-l'];
export const Header32M = styleDict['header-32-m'];
export const HeadersUppercaseHeader32MU = styleDict['headers/uppercase/header-32-m-u'];
export const HeadersHeader32R = styleDict['headers/header-32-r'];
export const HeadersUppercaseHeader32RU = styleDict['headers/uppercase/header-32-r-u'];
export const HeadersHeader32L = styleDict['headers/header-32-l'];
export const HeadersUppercaseHeader32LU = styleDict['headers/uppercase/header-32-l-u'];
export const HeadersHeader28M = styleDict['headers/header-28-m'];
export const HeadersUppercaseHeader28MU = styleDict['headers/uppercase/header-28-m-u'];
export const HeadersHeader28R = styleDict['headers/header-28-r'];
export const HeadersUppercaseHeader28RU = styleDict['headers/uppercase/header-28-r-u'];
export const HeadersHeader28L = styleDict['headers/header-28-l'];
export const HeadersUppercaseHeader28LU = styleDict['headers/uppercase/header-28-l-u'];
export const HeadersHeader24M = styleDict['headers/header-24-m'];
export const HeadersUppercaseHeader24MU = styleDict['headers/uppercase/header-24-m-u'];
export const HeadersHeader24R = styleDict['headers/header-24-r'];
export const HeadersUppercaseHeader24RU = styleDict['headers/uppercase/header-24-r-u'];
export const HeadersHeader24L = styleDict['headers/header-24-l'];
export const HeadersUppercaseHeader24LU = styleDict['headers/uppercase/header-24-l-u'];
export const BodyBody20 = styleDict['body/body-20'];
export const SubtitlesSubtitle16 = styleDict['subtitles/subtitle-16'];
export const BodyBody16 = styleDict['body/body-16'];
export const OtherButton14 = styleDict['other/button-14'];
export const SubtitlesSubtitle14 = styleDict['subtitles/subtitle-14'];
export const BodyBody14 = styleDict['body/body-14'];
export const OtherButton12 = styleDict['other/button-12'];
export const OtherCaption12 = styleDict['other/caption-12'];
export const OtherOverline10 = styleDict['other/overline-10'];
export const OtherTabular09 = styleDict['other/tabular-09'];
