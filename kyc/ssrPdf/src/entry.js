import {
  initializeState,
  initialState,
  reducer,
  rootEpic,
  SESSION_ERROR,
  SET_KYC_STATE,
  STATE_ERROR,
} from '@rdey/kyc-isomorphic-entities';
import '@rdey/kyc-isomorphic-entities/main.css';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import styled, { ServerStyleSheet } from 'styled-components';
// import Pdf from '@rdey/kyc-components/src/Pdf';
// import Pdf from './Pdf';
import { Pdf } from '@rdey/kyc-components';

const getData = (token, host) => {
  const store$ = new Subject();
  const action$ = store$.pipe(map(({ action }) => action));
  const state$ = store$.pipe(map(({ state }) => state));

  const returnAction$ = rootEpic(action$, state$);

  returnAction$.pipe(withLatestFrom(state$)).subscribe(([action, state]) => {
    store$.next({
      action,
      state: reducer(state, action),
    });
  });

  store$.next({
    action: initializeState(),
    state: initialState(token, host),
  });

  return new Promise((resolve, reject) => {
    store$
      .pipe(
        filter(({ action }) =>
          [SESSION_ERROR, STATE_ERROR].includes(action.type)),
        map(({ action }) => action),
      )
      .subscribe(({ error }) => {
        reject(error);
      });

    store$
      .pipe(
        filter(({ action }) => [SET_KYC_STATE].includes(action.type)),
        map(({ state }) => state),
      )
      .subscribe((state) => {
        resolve(state);
      });
  });
};
const Test = styled.div`
  color: orange;
`;
const ssrPdf = async (token, host) => {
  const state = await getData(token, host);
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<Pdf state={state} />));
  const scStyles = sheet.getStyleTags();

  console.log(scStyles);

  return {
    body,
    scStyles,
  };
};

export default ssrPdf;
