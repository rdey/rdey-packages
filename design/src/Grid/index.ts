import invariant from 'invariant';
import { fromEvent, merge } from 'rxjs';
import { distinctUntilChanged, map, share } from 'rxjs/operators';

export const VIEWPORT_320 = 320;
export const VIEWPORT_360 = 360;
export const VIEWPORT_400 = 400;
export const VIEWPORT_480 = 480;
export const VIEWPORT_600 = 600;
export const VIEWPORT_720 = 720;
export const VIEWPORT_840 = 840;
export const VIEWPORT_960 = 960;
export const VIEWPORT_1024 = 1024;
export const VIEWPORT_1280 = 1280;
export const VIEWPORT_1360 = 1360;
export const VIEWPORT_1600 = 1600;

export const viewports = [
  VIEWPORT_320,
  VIEWPORT_360,
  VIEWPORT_400,
  VIEWPORT_480,
  VIEWPORT_600,
  VIEWPORT_720,
  VIEWPORT_840,
  VIEWPORT_960,
  VIEWPORT_1024,
  VIEWPORT_1280,
  VIEWPORT_1360,
  VIEWPORT_1600,
];

export const margins = {
  [VIEWPORT_320]: 16,
  [VIEWPORT_360]: 16,
  [VIEWPORT_400]: 16,
  [VIEWPORT_480]: 16,
  [VIEWPORT_600]: 16,
  [VIEWPORT_720]: 24,
  [VIEWPORT_840]: 24,
  [VIEWPORT_960]: 24,
  [VIEWPORT_1024]: 32,
  [VIEWPORT_1280]: 32,
  [VIEWPORT_1360]: 40,
  [VIEWPORT_1600]: 40,
} as {
  [key: string]: number
};

export const numberOfCols = {
  [VIEWPORT_320]: 4,
  [VIEWPORT_360]: 4,
  [VIEWPORT_400]: 4,
  [VIEWPORT_480]: 4,
  [VIEWPORT_600]: 8,
  [VIEWPORT_720]: 8,
  [VIEWPORT_840]: 8,
  [VIEWPORT_960]: 12,
  [VIEWPORT_1024]: 12,
  [VIEWPORT_1280]: 12,
  [VIEWPORT_1360]: 12,
  [VIEWPORT_1600]: 12,
} as {
  [key: string]: number
};

export const columnWidths = {
  /* example */
  // [VIEWPORT_1600]:  (VIEWPORT_1600 - (1 + numberOfCols[VIEWPORT_1600]) * margins[VIEWPORT_1600]) / numberOfCols[VIEWPORT_1600],
  ...viewports.reduce(
    (o, viewport) => ({
      ...o,
      [viewport]:
        (viewport - (1 + numberOfCols[viewport]) * margins[viewport])
        * (1 / numberOfCols[viewport]),
    }),
    {},
  ),
};

export const getViewport = () => {
  const w = (window && window.innerWidth) || 1280;

  const maxIndex = viewports.length - 1;

  const targetIndex = viewports.findIndex((viewport) => w < viewport);

  if (targetIndex === -1) {
    return viewports[maxIndex];
  }
  if (targetIndex === 0) {
    return viewports[0];
  }

  const viewportIndex = targetIndex - 1;

  return viewports[viewportIndex];
};

export const VIEWPORT_CHANGE = 'VIEWPORT_CHANGE';

export const viewportChange = (viewport: number) => {
  invariant(
    viewports.includes(viewport),
    'invalid viewport, must be included in viewport and of type string',
  );
  return {
    type: VIEWPORT_CHANGE,
    viewport,
  };
};

export const resize$ = merge(
  fromEvent(window, 'resize'),
  fromEvent(window, 'orientationchange'),
).pipe(
  map(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  })),
  distinctUntilChanged(
    (p, q) => p.innerWidth === q.innerWidth && p.innerHeight === q.innerHeight,
  ),
  share(),
);

export const viewportEpic = () =>
  resize$.pipe(
    map(({ innerWidth }) => innerWidth),
    map(getViewport),
    distinctUntilChanged(),
    map((vp) => viewportChange(vp)),
  );
