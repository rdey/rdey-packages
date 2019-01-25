import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { sessionError, setBearer } from '../reducer';
import { FETCH_SESSION } from '../reducer/actions';
import { makeSelectToken, selectHost } from '../reducer/selectors';

const selectToken = makeSelectToken();

const fetchState = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SESSION),
    take(1),
    withLatestFrom(state$),
    map(([, state]) => ({
      token: selectToken(state),
      endpoint: `${selectHost(state)}/api/v1/sessions`,
    })),
    mergeMap(({ token, endpoint }) =>
      from(
        fetch(endpoint, {
          method: 'post',
          mode: 'cors',
          cache: 'no-cache',
          body: JSON.stringify({
            token,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then((r) => r.json())
          .then(({ bearer }) => bearer),
      )),

    map((bearer) => {
      if (!bearer) {
        return sessionError('No bearer received');
      }
      return setBearer(bearer);
    }),
    catchError((err) => {
      console.log(err);
      return of(sessionError(err));
    }),
  );

export default fetchState;
