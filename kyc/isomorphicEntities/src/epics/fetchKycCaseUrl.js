import invariant from 'invariant';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  catchError,
  ignoreElements,
  map,
  mergeMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { kycCaseUrlError, KYC_CASE_URL_FETCH } from '../reducer/actions';
import { makeSelectBearer, selectHost } from '../reducer/selectors';

const selectBearer = makeSelectBearer();

const fetchKycCaseUrl = (action$, state$) =>
  action$.pipe(
    ofType(KYC_CASE_URL_FETCH),
    take(1),
    withLatestFrom(state$),
    map(([, state]) => ({
      bearer: selectBearer(state),
      endpoint: `${selectHost(state)}/api/v1/kyc/case`,
    })),
    mergeMap(({ endpoint, bearer }) =>
      from(
        fetch(endpoint, {
          method: 'get',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            Authorization: `Bearer ${bearer}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }).then((r) => r.json()),
      )),
    tap(({ url }) => {
      invariant(url, 'url must be present in the response');

      window.location.href = url;
    }),
    ignoreElements(),
    catchError((err) => of(kycCaseUrlError(err))),
  );

export default fetchKycCaseUrl;
