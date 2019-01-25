import { ofType } from 'redux-observable';
import { empty, from, interval } from 'rxjs';
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { makeSelectBearer, selectHost } from '../reducer/selectors';
import { SET_KYC_STATE } from '../reducer/actions';

const selectBearer = makeSelectBearer();

const saveStateCron = (action$, state$) =>
  action$.pipe(
    ofType(SET_KYC_STATE),
    take(1),
    filter(() => typeof window !== 'undefined'),
    filter(() => !window.location.pathname.match(/pdf/)),
    switchMap(() =>
      interval(process.env.NODE_ENV === 'development' ? 20000 : 5000).pipe(
        withLatestFrom(state$),
        map(([, state]) => ({
          state,
          bearer: selectBearer(state),
          endpoint: `${selectHost(state)}/api/v1/kyc`,
        })),
        mergeMap(({ state, bearer, endpoint }) =>
          from(
            fetch(endpoint, {
              method: 'post',
              body: JSON.stringify({ data: state }),
              headers: {
                Authorization: `Bearer ${bearer}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }),
          ).pipe(catchError(() => empty()))),
      )),
    ignoreElements(),
  );

export default saveStateCron;
