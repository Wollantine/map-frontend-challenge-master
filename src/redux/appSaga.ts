import {all, fork} from 'redux-saga/effects';
import { jobFormSaga } from '../components/JobForm/redux/jobFormSaga';
import { toastSaga } from '../components/Toast/redux/ToastSaga';

export type TEffects = IterableIterator<any>;

export function* appSaga(): TEffects {
    yield all([
        jobFormSaga,
        toastSaga,
    ].map(fork));
}
