import { TEffects } from "../../../redux/appSaga";
import { QUEUE_TOAST, dismissToast, DISMISS_TOAST, showToast, SHOW_TOAST } from "./ToastActions";
import {takeEvery, put, race, call, take, select} from 'redux-saga/effects';
import { delay } from "redux-saga";
import { queueSelector, IToast, currentSelector } from "./ToastState";
import * as R from 'ramda';
import { Maybe } from "tsmonad";


const TOAST_TIME = 5000;
const ANIMATION_TIME = 500;

export function* toastSaga(): TEffects {
    yield takeEvery(SHOW_TOAST, waitAndRemoveToast);
    yield takeEvery(QUEUE_TOAST, showToastIfEmpty);
    yield takeEvery(DISMISS_TOAST, showNextToast);
}

function* waitAndRemoveToast(): TEffects {
    const {timeout} = yield race({
        timeout: call(delay, TOAST_TIME),
        toastRemoved: take(DISMISS_TOAST),
    });
    if (timeout) {
        yield put(dismissToast());
    }
}

function* showToastIfEmpty(): TEffects {
    const currentToast = yield select(currentSelector);
    if (isNothing(currentToast)) {
        yield call(showNextToastImmediately);
    }
}

function* showNextToast(): TEffects {
    yield call(delay, ANIMATION_TIME);
    yield call(showNextToastImmediately);
}

function* showNextToastImmediately(): TEffects {
    const queue = yield select(queueSelector);
    const nextToast: IToast | undefined = R.head(queue);
    if (!R.isNil(nextToast)) {
        yield put(showToast(nextToast));
    }
}

function isNothing(maybe: Maybe<any>): boolean {
    return maybe.caseOf({
        nothing: () => true,
        just: () => false,
    });
}