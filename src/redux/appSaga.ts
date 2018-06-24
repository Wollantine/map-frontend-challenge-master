import {all, fork} from 'redux-saga/effects';

export function* appSaga(): IterableIterator<any> {
    yield all([
        jobFormSaga,
    ].map(fork));
}