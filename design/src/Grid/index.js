import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import has from 'lodash/has';
import invariant from 'invariant';

/* (p/l)(s/m/l)(device) = (portrait/landscape)(small/medium/large)(handset/tablet/computer) */
const pshandset = 0;
const pmhandset = 360;
const plhandset = 400;
const lshandset = 480;
const pstablet = 600;
const pltablet = 720;
const llhandset = 840;
const lstablet = 960;
const lltablet = 1024;
const lscomputer = 1280;
const lmcomputer = 1360;

const minMq = (px) => `@media (min-width: ${px}px)`;

/*
  (p/l)(s/m/l)(device)Mq =
    (portrait/landscape)(small/medium/large)(handset/tablet/computer)(media query)
*/
export const pshandsetMq = minMq(pshandset);
export const pmhandsetMq = minMq(pmhandset);
export const plhandsetMq = minMq(plhandset);
export const lshandsetMq = minMq(lshandset);
export const pstabletMq = minMq(pstablet);
export const pltabletMq = minMq(pltablet);
export const llhandsetMq = minMq(llhandset);
export const lstabletMq = minMq(lstablet);
export const lltabletMq = minMq(lltablet);
export const lscomputerMq = minMq(lscomputer);
export const lmcomputerMq = minMq(lmcomputer);

const closedMq = (min, max) =>
  `@media (min-width: ${min}px) and (max-width: ${max - 1}px)`;

/*
  (p/l)(s/m/l)(device)ClosedMq =
    (portrait/landscape)(small/medium/large)(handset/tablet/computer)(closed)(media query)
*/
export const pshandsetClosedMq = closedMq(pshandset, pmhandset);
export const pmhandsetClosedMq = closedMq(pmhandset, plhandset);
export const plhandsetClosedMq = closedMq(plhandset, lshandset);
export const lshandsetClosedMq = closedMq(lshandset, pstablet);
export const pstabletClosedMq = closedMq(pstablet, pltablet);
export const pltabletClosedMq = closedMq(pltablet, llhandset);
export const llhandsetClosedMq = closedMq(llhandset, lstablet);
export const lstabletClosedMq = closedMq(lstablet, lltablet);
export const lltabletClosedMq = closedMq(lltablet, lscomputer);
export const lscomputerClosedMq = closedMq(lscomputer, lmcomputer);
export const lmcomputerClosedMq = lmcomputerMq;

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

  css += spans
    .map((span, index) => {
      let calculatedColumns = columns;

      if (
        dynamic
        && nthChildRowException !== null
        && index >= nthChildRowException
      ) {
        calculatedColumns = remainder;
      }

      if (span !== null) {
        calculatedColumns = 12 / span;
      }

      const width = getChildWidth({ columns: calculatedColumns, margin });

      return setChildWidth(index, getChildCss({ width, margin }));
    })
    .join('\n');

  return css;
};

const gridSizes = ['femto', 'nano', 'milli', 'kilo', 'giga', 'peta'];

const gridSizeProperties = {
  femto: {
    margin: 1,
    columns: 4,
  },
  nano: {
    margin: 1,
    columns: 8,
  },
  milli: {
    margin: 1.5,
    columns: 8,
  },
  kilo: {
    margin: 1.5,
    columns: 12,
  },
  giga: {
    margin: 2,
    columns: 12,
  },
  peta: {
    margin: 2.5,
    columns: 12,
  },
};

const getGridForSize = (size) => (props) =>
  getGridCss({
    ...gridSizeProperties[size],
    ...(has(props, size) ? props[size] : {}),
    /* children, dynamic, count */
    ...props,
  });

const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${closedMq(0, pstablet)} {
    ${getGridForSize('femto')};
  }
  ${closedMq(pstablet, pltablet)} {
    ${getGridForSize('nano')};
  }
  ${closedMq(pltablet, lstablet)} {
    ${getGridForSize('milli')};
  }
  ${closedMq(lstablet, lltablet)} {
    ${getGridForSize('kilo')};
  }
  ${closedMq(lltablet, lmcomputer)} {
    ${getGridForSize('giga')};
  }
  ${lmcomputerMq} {
    ${getGridForSize('peta')};
  }
`;

export default Grid;
