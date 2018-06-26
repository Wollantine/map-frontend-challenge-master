import {all, fork} from 'redux-saga/effects';
import { jobFormSaga } from '../components/JobForm/redux/jobFormSaga';

export type TEffects = IterableIterator<any>;

export function* appSaga(): TEffects {
    yield all([
        jobFormSaga,
    ].map(fork));
}
