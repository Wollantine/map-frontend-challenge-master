import { BLUR_FIELD, updateField, updateGeocode, UPDATE_FIELD } from './jobFormActions';
import {takeEvery, takeLatest, select, call, put} from 'redux-saga/effects';
import { TAction } from '../../../redux/appReducer';
import { pickupSelector, dropoffSelector } from './jobFormState';
import * as R from 'ramda';
import { geocodeAddress, GEOCODE_ENDPOINT, TGeocode } from '../../../api/geocode';
import { post, TError } from '../../../api/jobsApi';
import { TSelector } from '../../../redux/appState';
import { EFieldStatus } from './field';
import { delay } from 'redux-saga';
import { TEffects } from '../../../redux/appSaga';

const DEBOUNCE_TIME = 1000;

export function* jobFormSaga(): TEffects {
    yield takeEvery(BLUR_FIELD, checkAddress);
    yield takeLatest(UPDATE_FIELD, debounceAndCheckAddress);
}

function* debounceAndCheckAddress(action: TAction): TEffects {
    yield call(delay, DEBOUNCE_TIME);
    yield call(checkAddress, action);
}

function* checkAddress(action: TAction): TEffects {
    const field = action.fieldName;
    const address = yield select(fieldSelector(field));
    const responsePromise = post(GEOCODE_ENDPOINT, {address});
    const eitherGeocodeOrError = yield call(geocodeAddress, responsePromise);
    yield put(eitherGeocodeOrError.caseOf({
        left: (error: TError) => (updateField(field, null, EFieldStatus.invalid)),
        right: (geocode: TGeocode) => (updateGeocode(field, geocode)),
    }));
}

function fieldSelector(fieldName: string): TSelector<string> {
    const selector = fieldName === 'pickup'
        ? pickupSelector
        : dropoffSelector;
    return R.pipe(
        selector,
        R.propOr('', 'value'),
    ) as any;
}
