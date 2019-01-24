import { ofType } from 'redux-observable';
import { delay, ignoreElements, take } from 'rxjs/operators';
import { SET_KYC_STATE } from '../reducer/actions';

const docraptorCompleted = (action$) =>
  action$.pipe(
    ofType(SET_KYC_STATE),
    take(1),
    delay(1000),

    ignoreElements(),
  );

export default docraptorCompleted;
