import Axios from 'axios';
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
        Axios({
          method: 'post',
          url: endpoint,
          data: {
            token,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }).then((response) => {
          const { bearer } = response.data;
          return bearer;
        }),
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
