import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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

const closedMq = (min, max) => `@media (min-width: ${min}px) and (max-width: ${max - 1}px)`;

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
  const width = `${baseWidth} - ${margin * (columns - 1) / columns}em - ${margin * 2 / columns}em)`;
  return width;
};

const getChildCss = ({ width, margin }) => `
    min-width: ${width};
    max-width: ${width};
    margin-bottom: ${margin}em;
    margin-left: ${margin}em;
  `;

const getSize = ({ margin, columns, children }) => {
  const count = React.Children.count(children);
  /* cc = calculatedColumns */
  let nthChildRowException = null;
  let remainder = count % columns;
  if (count < columns) {
    nthChildRowException = 0;
  } else if (count > columns && remainder !== 0) {
    nthChildRowException = count - remainder + 1;
  }

  if (remainder % 2 === 1 && count !== 1) {
    remainder += 1;
  }

  const width = getChildWidth({ columns, margin });

  let css = `
    padding-top: ${margin}em;
    padding-right: ${margin}em;
    & > * {
      ${getChildCss({ width, margin })};
    }
  `;
  if (nthChildRowException !== null) {
    const lastRowWidth = getChildWidth({ columns: remainder, margin });
    css += `
      & > *:nth-child(n+${nthChildRowException}) {
        ${getChildCss({ width: lastRowWidth, margin })};
      }
    `;
  }
  return css;
};
const Grid = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${closedMq(0, pstablet)} {
    ${({ children }) => getSize({ margin: 1, columns: 4, children })};
  }
  ${closedMq(pstablet, pltablet)} {
    ${({ children }) => getSize({ margin: 1, columns: 8, children })};
  }
  ${closedMq(pltablet, lstablet)} {
    ${({ children }) => getSize({ margin: 1.5, columns: 8, children })};
  }
  ${closedMq(lstablet, lltablet)} {
    ${({ children }) => getSize({ margin: 1.5, columns: 12, children })};
  }
  ${closedMq(lltablet, lmcomputer)} {
    ${({ children }) => getSize({ margin: 2, columns: 12, children })};
  }
  ${lmcomputerMq} {
    ${({ children }) => getSize({ margin: 2.5, columns: 12, children })};
  }
`;


export default Grid;
