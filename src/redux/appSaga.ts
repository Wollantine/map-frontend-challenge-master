import {all, fork} from 'redux-saga/effects';
import { jobFormSaga } from '../components/JobForm/redux/jobFormSaga';

export function* appSaga(): IterableIterator<any> {
    yield all([
        jobFormSaga,
    ].map(fork));
}
