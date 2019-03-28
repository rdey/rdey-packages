/**
 * @class ExampleComponent
 */

import * as React from 'react';
import * as rdeyDesign from '@rdey/design';
import styled, { ThemeProvider } from 'styled-components';

type Position = {
  x: number;
  y: number;
  z: number;
};
type Positions = {
  [key: string]: Position;
};
type State = {
  hash: null | string;
  positions: Positions;
  animate: boolean;
};

type Items = Array<{ key: string; Cell: React.FC }>;

type Props = {
  items: Items;
  viewport: number;
  numberOfCols: {
    [key: string]: number;
  };
  margins: {
    [key: string]: number;
  };
};

type Action = {
  type: 'SET_ITEM' | 'SET_HASH' | 'STOP_ANIMATION';
  hash?: string;
  key?: string;
  el?: HTMLElement | null;
};

const OuterBound = styled.div`
  position: relative;
`;

const Wrapper = styled.div``;

const AbsoluteWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  visibility: hidden;
`;

const Row = styled.div<{ emptySpace: number }>`
  display: flex;
  justify-content: flex-start;
`;

const TRANSITION_DURATION: number = 5000;

const CellWrapper = styled.div<{ first: boolean; last: boolean }>`
  ${({ theme: { viewport, numberOfCols, margins }, first, last }) => {
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

function init(items: Items): State {
  const positions = items.reduce(
    (c, { key }) => {
      return {
        ...c,
        [key]: {
          x: 0,
          y: 0,
          z: -100,
        },
      };
    },
    {} as { [key: string]: Position }
  );
  return {
    hash: null,
    positions,
    animate: false,
  };
}

const setItem = (state: State, action: Action) => {
  const { el, key } = action;
  if (!key || !el) {
    throw new Error();
  }
  const y = el.offsetTop;
  const x = el.offsetLeft;
  return {
    ...state,
    positions: {
      ...state.positions,
      [key]: {
        x,
        y,
        z: 1,
      },
    },
  };
};

const getItemsHash = (items: Items) => {
  return items.map(({ key }) => key).join(',');
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEM':
      return setItem(state, action);
    case 'SET_HASH':
      if (!action.hash) {
        throw new Error();
      }
      return {
        ...state,
        hash: action.hash,
        animate: true,
      };
    case 'STOP_ANIMATION':
      return {
        ...state,
        animate: false,
      };
    default:
      throw new Error();
  }
}

const Grid = ({
  items,
  viewport = rdeyDesign.getViewport(),
  numberOfCols = rdeyDesign.numberOfCols,
  margins = rdeyDesign.margins,
}: Props) => {
  const cols = numberOfCols[viewport];
  const [{ positions, hash, animate }, dispatch] = React.useReducer(
    reducer,
    items,
    init
  );
  const refs = React.useRef<{
    currentPositions: Positions;
    nextPositions: Positions;
    currentItems: Items;
    previousItems: Items;
  }>({
    currentPositions: {},
    nextPositions: {},
    currentItems: items,
    previousItems: [],
  });

  const rows = (
    itemsToRender: Items,
    ref: (key: string, el: HTMLElement | null) => void,
    translateMatrix = positions
  ) =>
    getRows(itemsToRender, cols).map((rowItems, index) => {
      return (
        <Row emptySpace={cols - rowItems.length} key={index}>
          {rowItems.map(({ Cell, key }, index) => {
            const { x, y, z } = translateMatrix[key];
            const style: React.CSSProperties = {
              transform: `translate3d(${[x, y, z].join('px,')}px)`,
            };
            if (animate) {
              style.transition = `transform ${TRANSITION_DURATION}ms ease`;
            }
            return (
              <CellWrapper
                key={key}
                first={index === 0}
                last={index === rowItems.length - 1}
                ref={(el) => ref(key, el)}
                style={style}
              >
                <Cell />
              </CellWrapper>
            );
          })}
        </Row>
      );
    });

  const newHash = getItemsHash(items);

  const newGrid = newHash !== hash;

  if (newGrid) {
    if (!animate) {
      refs.current.previousItems = refs.current.currentItems;
    }
    refs.current.currentItems = items;
  }

  React.useEffect(() => {
    dispatch({
      type: 'SET_HASH',
      hash: newHash,
    });
  }, [newHash]);

  React.useEffect(() => {
    let timer: number;
    const clear = () => {
      window.clearTimeout(timer);
    };
    if (animate) {
      timer = window.setTimeout(() => {
        dispatch({
          type: 'STOP_ANIMATION',
        });
      }, TRANSITION_DURATION);
    } else {
      clear();
    }
    return clear;
  }, [animate, newHash]);

  let renderItems = refs.current.currentItems;
  let measureItems = refs.current.currentItems;
  if (newGrid || animate) {
    renderItems = refs.current.previousItems;
    measureItems = refs.current.currentItems;
  }

  let translateMatrix = positions;

  if (animate) {
    translateMatrix = measureItems.reduce(
      (c, { key }) => {
        const { x: bx, y: by, z: bz } = refs.current.nextPositions[key];
        const { x: ax, y: ay, z: az } = refs.current.currentPositions[key];
        return {
          ...c,
          [key]: {
            x: bx - ax,
            y: by - ay,
            z: bz - az,
          },
        };
      },
      {} as Positions
    );
  }

  return (
    <ThemeProvider theme={{ viewport, numberOfCols, margins }}>
      <OuterBound>
        <Wrapper>
          {rows(
            renderItems,
            (key, el) => {
              if (el) {
                refs.current.currentPositions[key] = {
                  x: el.offsetLeft,
                  y: el.offsetTop,
                  z: 0,
                };
              }
            },
            translateMatrix
          )}
        </Wrapper>
        {newGrid && (
          <AbsoluteWrapper>
            {rows(measureItems, (key, el) => {
              if (el) {
                refs.current.nextPositions[key] = {
                  x: el.offsetLeft,
                  y: el.offsetTop,
                  z: 0,
                };
              }
            })}
          </AbsoluteWrapper>
        )}
      </OuterBound>
    </ThemeProvider>
  );
};

export default Grid;
