import { TEffects } from "../../../redux/appSaga";
import { QUEUE_TOAST, skipToast, SKIP_TOAST } from "./ToastActions";
import {takeEvery, put, race, call, take} from 'redux-saga/effects';
import { delay } from "redux-saga";

const TOAST_TIME = 5000;

export function* toastSaga(): TEffects {
    yield takeEvery(QUEUE_TOAST, waitAndRemoveToast);
}

function* waitAndRemoveToast(): TEffects {
    const {timeout} = yield race({
        timeout: call(delay, TOAST_TIME),
        toastRemoved: take(SKIP_TOAST),
    });
    if (timeout) {
        yield put(skipToast());
    }
}
