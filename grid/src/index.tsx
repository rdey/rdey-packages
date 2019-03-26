/**
 * @class ExampleComponent
 */

import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getViewport, numberOfCols, margins } from '@rdey/design';
// import console = require('console');

const Wrapper = styled.div``;

const Row =
  styled.div <
  { emptySpace: number } >
  `
  display: flex;
  justify-content: flex-start;
`;

type Props = {
  items: Array<{ key: string, Cell: React.FC }>,
};

const CellWrapper =
  styled.div <
  { first: boolean, last: boolean } >
  `
  ${({ theme: { viewport }, first, last }) => {
    const columns = numberOfCols[viewport];
    const margin = margins[viewport];
    const baseWidth = `calc(${100 / columns}% + ${margin / columns}px`;
    const width = `${baseWidth} - ${(margin * columns) /
      columns}px - ${(margin * 2) / columns}px)`;
    return `
      min-width: ${width};
      max-width: ${width};
      ${first ? `margin-left: ${margin}px` : ''}
      ${!last ? `margin-right: ${margin}px` : ''}
    `;
  }}
`;

function getRows<T>(arr: T[], rowSize: number): T[][] {
  if (arr.length < rowSize) {
    return [arr];
  }
  const rows: T[][] = [[]];

  for (let i = 0; i < arr.length; i += 1) {
    if (i % rowSize === 0 && i > 0) {
      rows.push([]);
    }
    rows[rows.length - 1].push(arr[i]);
  }
  return rows;
}

export default class Grid extends React.Component<Props> {
  registerChild = (el: HTMLElement | null) => {
    if (!el) {
      return;
    }
    const top = el.offsetTop;
    const left = el.offsetLeft;
    console.log(top, left);
  };
  render() {
    const { items } = this.props;
    const viewport = getViewport();
    const cols = numberOfCols[viewport];
    return (
      <ThemeProvider theme={{ viewport }}>
        <Wrapper>
          {getRows(items, cols).map((rowItems, index) => {
            return (
              <Row emptySpace={cols - rowItems.length} key={index}>
                {rowItems.map((Item, index) => {
                  return (
                    <CellWrapper
                      key={Item.key}
                      first={index === 0}
                      last={index === rowItems.length - 1}
                      ref={this.registerChild}
                    >
                      <Item.Cell />
                    </CellWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      </ThemeProvider>
    );
  }
}
