import {
  ignoreElements, take, mapTo, tap,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { INITIALIZE_STATE, fetchSession } from '../reducer/actions';
import docraptorCompleted from './docraptorCompleted';
import fetchStateEpic from './fetchState';
import fetchSessionEpic from './fetchSession';
import saveStateCron from './saveStateCron';
import fetchKycCaseUrl from './fetchKycCaseUrl';

const initializeState = (action$) =>
  action$.pipe(
    ofType(INITIALIZE_STATE),
    take(1),
    mapTo(fetchSession()),
  );

const rootEpic = combineEpics(
  initializeState,
  docraptorCompleted,
  fetchStateEpic,
  fetchSessionEpic,
  saveStateCron,
  fetchKycCaseUrl,
);
export default rootEpic;
