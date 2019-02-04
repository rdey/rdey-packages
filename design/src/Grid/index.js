import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
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

const pshandsetMq = minMq(pshandset);
const pmhandsetMq = minMq(pmhandset);
const plhandsetMq = minMq(plhandset);
const lshandsetMq = minMq(lshandset);
const pstabletMq = minMq(pstablet);
const pltabletMq = minMq(pltablet);
const llhandsetMq = minMq(llhandset);
const lstabletMq = minMq(lstablet);
const lltabletMq = minMq(lltablet);
const lscomputerMq = minMq(lscomputer);
const lmcomputerMq = minMq(lmcomputer);

const closedMq = (min, max) =>
  `@media (min-width: ${min}px) and (max-width: ${max - 1}px)`;

const pshandsetClosedMq = closedMq(pshandset, pmhandset);
const pmhandsetClosedMq = closedMq(pmhandset, plhandset);
const plhandsetClosedMq = closedMq(plhandset, lshandset);
const lshandsetClosedMq = closedMq(lshandset, pstablet);
const pstabletClosedMq = closedMq(pstablet, pltablet);
const pltabletClosedMq = closedMq(pltablet, llhandset);
const llhandsetClosedMq = closedMq(llhandset, lstablet);
const lstabletClosedMq = closedMq(lstablet, lltablet);
const lltabletClosedMq = closedMq(lltablet, lscomputer);
const lscomputerClosedMq = closedMq(lscomputer, lmcomputer);
const lmcomputerClosedMq = lmcomputerMq;

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

const getSize = ({
  margin, columns, children, dynamic,
}) => {
  const count = React.Children.count(children);

  const spans = [children].flat().map(({ props }) => {
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

  // if (nthChildRowException !== null) {
  //   const lastRowWidth = getChildWidth({ columns: remainder, margin });
  //   css += `
  //     & > *:nth-child(n+${nthChildRowException}) {
  //       ${getChildCss({ width: lastRowWidth, margin })};
  //     }
  //   `;
  // }

  return css;
};
const Grid = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${closedMq(0, pstablet)} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 1, columns: 4, children, dynamic,
    })};
  }
  ${closedMq(pstablet, pltablet)} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 1, columns: 8, children, dynamic,
    })};
  }
  ${closedMq(pltablet, lstablet)} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 1.5, columns: 8, children, dynamic,
    })};
  }
  ${closedMq(lstablet, lltablet)} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 1.5, columns: 12, children, dynamic,
    })};
  }
  ${closedMq(lltablet, lmcomputer)} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 2, columns: 12, children, dynamic,
    })};
  }
  ${lmcomputerMq} {
    ${({ children, dynamic }) =>
    getSize({
      margin: 2.5, columns: 12, children, dynamic,
    })};
  }
`;

export default Grid;
