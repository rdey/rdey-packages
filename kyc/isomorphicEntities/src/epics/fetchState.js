import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { KYC_TYPE_COMPANY, KYC_TYPE_PERSON } from '@rdey/kyc-constants';
import { SET_BEARER, stateError } from '../reducer';
import { setKycState } from '../reducer/actions';
import { makeSelectBearer, selectHost } from '../reducer/selectors';

const selectBearer = makeSelectBearer();

const fetchState = (action$, state$) =>
  action$.pipe(
    ofType(SET_BEARER),
    take(1),
    withLatestFrom(state$),
    map(([, state]) => ({
      bearer: selectBearer(state),
      endpoint: `${selectHost(state)}/api/v1/kyc`,
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
    map(({ data, type }) => {
      if (!data || !type) {
        console.log('No data and no type is preset!');
      }

      return setKycState({
        ...data,
        kycType: type === 'person' ? KYC_TYPE_PERSON : KYC_TYPE_COMPANY,
      });
    }),
    catchError((err) => of(stateError(err))),
  );

export default fetchState;
