/**
 * @class ExampleComponent
 */

import * as React from 'react';
import * as rdeyDesign from '@rdey/design';
import { uniqBy, sortBy } from 'lodash';
import styled, { ThemeProvider } from 'styled-components';

type Position = {
  x: number;
  y: number;
  z?: number;
};
type Positions = {
  [key: string]: Position;
};
type State = {
  hash: null | string;
  animate: boolean;
  mount: boolean;
  firstRender: boolean;
};

type UnparsedItems = Array<{ key: string | number | boolean; Cell: React.FC }>;
type Item = { key: string; Cell: React.FC };
type Items = Array<Item>;

type Props = {
  items: UnparsedItems;
  viewport: number;
  numberOfCols: {
    [key: string]: number;
  };
  margins: {
    [key: string]: number;
  };
  duration: number;
};

type Action = {
  type: 'SET_HASH' | 'STOP_ANIMATION' | 'ANIMATE';
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
  right: 0;
  visibility: hidden;
  z-index: -1;
`;

const Row = styled.div<{ emptySpace: number }>`
  display: flex;
  justify-content: flex-start;
`;

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
  return {
    hash: null,
    animate: false,
    mount: false,
    firstRender: true,
  };
}

const getItemsHash = (items: Items) => {
  return items.map(({ key }) => key).join(',');
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_HASH':
      if (!action.hash) {
        throw new Error();
      }
      let mount = true;
      if (state.firstRender || state.animate) {
        mount = false;
      }
      return {
        ...state,
        hash: action.hash,
        firstRender: false,
        mount,
      };
    case 'ANIMATE':
      return {
        ...state,
        animate: true,
        mount: false,
      };
    case 'STOP_ANIMATION':
      return {
        ...state,
        animate: false,
        mount: false,
      };
    default:
      throw new Error();
  }
}

const getConfig = ({
  currentItems,
  nextItems,
}: {
  currentItems: Items;
  nextItems: Items;
}) => {
  const currentKeys = currentItems.map(({ key }) => key);
  const nextKeys = nextItems.map(({ key }) => key);

  const addedKeys = nextKeys.filter((currentKey) => {
    return !currentKeys.includes(currentKey);
  });
  const removedKeys = currentKeys.filter((previousKey) => {
    return !nextKeys.includes(previousKey);
  });

  const shuffledKeys = nextKeys.filter((currentKey, index) => {
    return (
      !addedKeys.includes(currentKey) &&
      !removedKeys.includes(currentKey) &&
      index !== currentKeys.indexOf(currentKey)
    );
  });

  const getOriginal = (arr: Items) => (k: string) => {
    const r = arr.find(({ key }) => k === key);
    if (!r) {
      throw new Error('invalid code');
    }
    return r;
  };

  return {
    addedKeys,
    removedKeys,
    shuffledKeys,
    addedItems: addedKeys.map(getOriginal(nextItems)),
    removedItems: removedKeys.map(getOriginal(currentItems)),
    shuffledItems: shuffledKeys.map(getOriginal(nextItems)),
  };
};

function onNextFrame(callback: () => any) {
  setTimeout(function () {
    window.requestAnimationFrame(callback)
  }, 0)
}

const Grid = ({
  items: unparsedItems,
  viewport = rdeyDesign.getViewport(),
  numberOfCols = rdeyDesign.numberOfCols,
  margins = rdeyDesign.margins,
  duration = 500,
}: Props) => {
  const items: Items = unparsedItems.map((ob) => ({
    ...ob,
    key: ob.key.toString(),
  }));
  const cols = numberOfCols[viewport];
  const [{ hash, animate, firstRender, mount }, dispatch] = React.useReducer(
    reducer,
    items,
    init
  );
  const refs = React.useRef<{
    containerHeight: {
      current: number | null;
      previous: number | null;
    };
    previousPositions: Positions;
    currentPositions: Positions;
    currentItems: Items;
    previousItems: Items;
    config: {
      addedKeys: string[];
      removedKeys: string[];
      shuffledKeys: string[];
      addedItems: Items;
      removedItems: Items;
      shuffledItems: Items;
    };
  }>({
    containerHeight: { current: null, previous: null },
    previousPositions: {},
    currentPositions: {},
    currentItems: items,
    previousItems: [],
    config: {
      addedKeys: [],
      removedKeys: [],
      shuffledKeys: [],
      addedItems: [],
      removedItems: [],
      shuffledItems: [],
    },
  });
  const newHash = getItemsHash(items);

  const newGrid = newHash !== hash;

  if (newGrid) {
    refs.current.config = getConfig({
      currentItems: refs.current.currentItems,
      nextItems: items,
    });

    /* START UPDATE */
    if (!animate) {
      refs.current.previousItems = refs.current.currentItems;
    }
    refs.current.currentItems = items;
    /* END UPDATE */
  }

  const {
    previousPositions,
    currentPositions,
    currentItems,
    previousItems,
    config: {
      addedKeys,
      removedKeys,
      shuffledKeys,
      addedItems,
      removedItems,
      shuffledItems,
    },
  } = refs.current;

  React.useEffect(() => {
    if (newGrid) {
      dispatch({
        type: 'SET_HASH',
        hash: newHash,
      });
    }
  }, [newHash, newGrid]);

  React.useEffect(() => {
    if (mount) {
      /* make sure the mount has been committed to the DOM */
      onNextFrame(() => {
        dispatch({
          type: 'ANIMATE',
        });
      });
    }
  }, [mount]);

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
      }, duration);
    } else {
      clear();
    }
    return clear;
  }, [animate, newHash]);

  const rows = ({
    itemsToRender,
    ref,
    style,
  }: {
    itemsToRender: Items;
    ref?: (key: string, el: HTMLElement | null) => void;
    style?: (key: string) => React.CSSProperties;
  }) =>
    getRows(itemsToRender, cols).map((rowItems, index) => {
      const rowKey = rowItems.map(({ key }) => key).join(',');
      return (
        <Row emptySpace={cols - rowItems.length} key={rowKey}>
          {rowItems.map(({ Cell, key }, index) => {
            return (
              <CellWrapper
                key={key}
                first={index === 0}
                last={index === rowItems.length - 1}
                ref={(el) => {
                  if (ref) {
                    ref(key, el);
                  }
                }}
                style={style ? style(key) : undefined}
              >
                <Cell />
              </CellWrapper>
            );
          })}
        </Row>
      );
    });
  const wrapperMeasureContainerHeight = (context: 'previous' | 'current') => (
    el: HTMLElement | null
  ) => {
    if (!el) {
      return;
    }
    refs.current.containerHeight[context] = el.offsetHeight;
  };
  let child = (
    <>
      <Wrapper>
        {rows({
          itemsToRender: currentItems,
        })}
      </Wrapper>
      <AbsoluteWrapper ref={wrapperMeasureContainerHeight('current')}>
        {rows({
          itemsToRender: currentItems,
          ref: (key, el) => {
            if (el) {
              currentPositions[key] = {
                x: el.offsetLeft,
                y: el.offsetTop,
              };
            }
          },
        })}
      </AbsoluteWrapper>
    </>
  );

  const measureNewGrid = newGrid ? (
    <AbsoluteWrapper ref={wrapperMeasureContainerHeight('current')}>
      {rows({
        itemsToRender: currentItems,
        ref: (key, el) => {
          if (el) {
            currentPositions[key] = {
              x: el.offsetLeft,
              y: el.offsetTop,
            };
          }
        },
      })}
    </AbsoluteWrapper>
  ) : null;

  if (newGrid) {
    child = (
      <>
        <Wrapper ref={wrapperMeasureContainerHeight('previous')}>
          {rows({
            itemsToRender: previousItems,
            ref: (key, el) => {
              if (el) {
                previousPositions[key] = {
                  x: el.offsetLeft,
                  y: el.offsetTop,
                };
              }
            },
          })}
        </Wrapper>
        {measureNewGrid}
      </>
    );
  }

  const animationRenderItems = sortBy(
    uniqBy([...previousItems, ...addedItems, ...removedItems], 'key'),
    'key'
  );

  if (mount) {
    child = (
      <>
        <Wrapper
          style={{ height: refs.current.containerHeight.previous + 'px' }}
        >
          {rows({
            itemsToRender: animationRenderItems,
            style(key) {
              const added = addedKeys.includes(key);
              const removed = removedKeys.includes(key);
              const { x, y } = added
                ? currentPositions[key]
                : previousPositions[key];

              let z = 1;

              if (added) {
                z = 0;
              }

              if (removed) {
                z = 1;
              }

              const transform = `translate3d(${[x, y, 0].join(
                'px,'
              )}px) scale(${z})`;

              const style: React.CSSProperties = {
                transform,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
              };

              return style;
            },
          })}
        </Wrapper>
      </>
    );
  }

  if (animate) {
    child = (
      <>
        <Wrapper
          style={{ height: refs.current.containerHeight.current + 'px' }}
        >
          {rows({
            itemsToRender: animationRenderItems,
            style(key) {
              const added = addedKeys.includes(key);
              const removed = removedKeys.includes(key);
              const { x, y } = currentPositions[key];

              let z = 1;

              if (added) {
                z = 1;
              }

              if (removed) {
                z = 0;
              }

              const transform = `translate3d(${[x, y, 0].join(
                'px,'
              )}px) scale(${z})`;

              const style: React.CSSProperties = {
                transform,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                transition: `transform ${duration}ms ease`,
              };
              return style;
            },
          })}
        </Wrapper>
        {measureNewGrid}
      </>
    );
  }

  return (
    <ThemeProvider theme={{ viewport, numberOfCols, margins }}>
      <OuterBound>{child}</OuterBound>
    </ThemeProvider>
  );
};

export default Grid;
