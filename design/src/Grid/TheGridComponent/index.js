import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import has from 'lodash/has';
import fromPairs from 'lodash/fromPairs';
import invariant from 'invariant';

// 'femto',
// 'pico',
// 'nano',
// 'micro',
// 'milli',
// 'one',
// 'kilo',
// 'mega',
// 'giga',
// 'tera',
// 'peta',

const femto = 0;
const pico = 360;
const nano = 400;
const micro = 480;
const milli = 600;
const one = 720;
const kilo = 840;
const mega = 960;
const giga = 1024;
const tera = 1280;
const peta = 1360;

const minMq = (px) => `@media (min-width: ${px}px)`;

/*
  (p/l)(s/m/l)(device)Mq =
    (portrait/landscape)(small/medium/large)(handset/tablet/computer)(media query)
*/
export const femtoMq = minMq(femto);
export const picoMq = minMq(pico);
export const nanoMq = minMq(nano);
export const microMq = minMq(micro);
export const milliMq = minMq(milli);
export const oneMq = minMq(one);
export const kiloMq = minMq(kilo);
export const megaMq = minMq(mega);
export const gigaMq = minMq(giga);
export const teraMq = minMq(tera);
export const petaMq = minMq(peta);

const closedMq = (min, max) =>
  `@media (min-width: ${min}px) and (max-width: ${max - 1}px)`;

/*
  (p/l)(s/m/l)(device)ClosedMq =
    (portrait/landscape)(small/medium/large)(handset/tablet/computer)(closed)(media query)
*/
export const femtoClosedMq = closedMq(femto, pico);
export const picoClosedMq = closedMq(pico, nano);
export const nanoClosedMq = closedMq(nano, micro);
export const microClosedMq = closedMq(micro, milli);
export const milliClosedMq = closedMq(milli, one);
export const oneClosedMq = closedMq(one, kilo);
export const kiloClosedMq = closedMq(kilo, mega);
export const megaClosedMq = closedMq(mega, giga);
export const gigaClosedMq = closedMq(giga, tera);
export const teraClosedMq = closedMq(tera, peta);
export const petaClosedMq = petaMq;

const getChildWidth = ({ columns, margin }) => {
  const baseWidth = `calc(${100 / columns}% + ${margin / columns}em`;
  const width = `${baseWidth} - ${(margin * (columns - 1))
    / columns}em - ${(margin * 2) / columns}em)`;
  return width;
};

const getChildCss = ({ width, margin }) => `
  min-width: ${width};
  max-width: ${width};
  margin-bottom: ${margin}em;
  margin-left: ${margin}em;
`;

const setChildWidth = (index, css) => `
    & > *:nth-child(${index + 1}) {
      ${css};
    }
  `;

const getGridCss = ({
  margin, columns, children, dynamic,
}) => {
  const allChildren = [children].flat(Infinity);

  const count = allChildren.length;

  const spans = allChildren.map(({ props }) => {
    const propSpan = get(props, 'span');
    if (propSpan) {
      const number = Number(propSpan);
      invariant(
        typeof number === 'number' && !Number.isNaN(number),
        'number props must be valid number!',
      );
      return number;
    }
    return null;
  });

  /* start lastRowCalulations: make the last row span correctly */
  const countWithSpans = count + spans.reduce((total, span) => (span ? span - 1 : 0), 0);
  let nthChildRowException = null;
  let remainder = countWithSpans % columns;
  if (countWithSpans < columns) {
    nthChildRowException = 0;
  } else if (countWithSpans > columns && remainder !== 0) {
    nthChildRowException = countWithSpans - remainder + 1;
  }
  if (remainder % 2 === 1 && countWithSpans !== 1) {
    remainder += 1;
  }
  /* end lastRowCalulations */

  let css = `
    padding-top: ${margin}em;
    padding-right: ${margin}em;
  `;

  const childCss = getChildCss({
    width: getChildWidth({ columns, margin }),
    margin,
  });

  css += `
    & > * {
      ${childCss};
    }
  `;

  /* overrides for & > * styling */
  css += spans
    .map((span, index) => {
      let calculatedColumns = columns;
      let width = null;

      if (
        dynamic
        && nthChildRowException !== null
        && index >= nthChildRowException
      ) {
        calculatedColumns = remainder;
        width = getChildWidth({ columns: calculatedColumns, margin });
      }

      if (span !== null) {
        calculatedColumns = 12 / span;
        width = getChildWidth({ columns: calculatedColumns, margin });
      }

      if (width !== null) {
        return setChildWidth(index, getChildCss({ width, margin }));
      }

      return '';
    })
    .join('\n');

  return css;
};

const defaultGridSizes = {
  A: {
    margin: 1,
    columns: 4,
  },
  B: {
    margin: 1,
    columns: 8,
  },
  C: {
    margin: 1.5,
    columns: 8,
  },
  D: {
    margin: 1.5,
    columns: 12,
  },
  E: {
    margin: 2,
    columns: 12,
  },
  F: {
    margin: 2.5,
    columns: 12,
  },
};

const gridSizes = [
  'femto', // 0
  'pico', // 360
  'nano', // 400
  'micro', // 480
  'milli', // 600
  'one', // 720
  'kilo', // 840
  'mega', // 960
  'giga', // 1024
  'tera', // 1280
  'peta', // 1360
];

const defaultGridConfigMap = {
  A: ['femto', 'pico', 'nano', 'micro'],
  B: ['milli'],
  C: ['one', 'kilo'],
  D: ['mega'],
  E: ['giga', 'tera'],
  F: ['peta'],
};

export const defaultGridConfig = fromPairs(
  Object.entries(defaultGridConfigMap)
    .map(([key, bps]) => bps.map((bp) => [bp, defaultGridSizes[key]]))
    .flat(),
);

const getGridForSize = (defaultSize, size) => (props) => {
  const customSize = has(props, size);
  return getGridCss({
    ...defaultGridSizes[defaultSize],
    ...(customSize ? props[size] : {}),
    /* children, dynamic, count */
    ...props,
  });
};
const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* femto: 0-359 */
  ${closedMq(femto, pico)} {
    ${getGridForSize('A', 'femto')};
  }
  /* pico: 360-39 */
  ${closedMq(pico, nano)} {
    ${getGridForSize('A', 'pico')};
  }
  /* nano: 400-479 */
  ${closedMq(nano, micro)} {
    ${getGridForSize('A', 'nano')};
  }
  /* micro: 480-599 */
  ${closedMq(micro, milli)} {
    ${getGridForSize('A', 'micro')};
  }
  /* milli: 600-719 */
  ${closedMq(milli, one)} {
    ${getGridForSize('B', 'milli')};
  }
  /* one: 720-839 */
  ${closedMq(one, kilo)} {
    ${getGridForSize('C', 'one')};
  }
  /* kilo: 840-959 */
  ${closedMq(kilo, mega)} {
    ${getGridForSize('C', 'kilo')};
  }
  /* mega: 960-1023 */
  ${closedMq(mega, giga)} {
    ${getGridForSize('D', 'mega')};
  }
  /* giga: 1024-1279 */
  ${closedMq(giga, tera)} {
    ${getGridForSize('E', 'giga')};
  }
  /* tera: 1280-1359 */
  ${closedMq(tera, peta)} {
    ${getGridForSize('E', 'tera')};
  }
  /* peta: 1360-Infinity */
  ${petaMq} {
    ${getGridForSize('F', 'peta')};
  }
`;

export default Grid;
