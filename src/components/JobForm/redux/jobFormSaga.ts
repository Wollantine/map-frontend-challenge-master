import { BLUR_FIELD, updateGeocode, UPDATE_FIELD, validateField, START_CREATING_JOB, finishCreatingJob } from './jobFormActions';
import {takeEvery, takeLatest, select, call, put} from 'redux-saga/effects';
import { TAction } from '../../../redux/appReducer';
import { pickupSelector, dropoffSelector } from './jobFormState';
import * as R from 'ramda';
import { geocodeAddress, GEOCODE_ENDPOINT, TGeocode } from '../../../api/geocode';
import { post, TError } from '../../../api/jobsApi';
import { TSelector, mapSelector } from '../../../redux/appState';
import { EFieldStatus } from './field';
import { delay } from 'redux-saga';
import { TEffects } from '../../../redux/appSaga';
import { IMapState } from '../../Map/redux/MapState';
import { queueToast } from '../../Toast/redux/ToastActions';
import { EToastType } from '../../Toast/redux/ToastState';
import { Maybe } from 'tsmonad';
import { JOB_ENDPOINT, createJob, TJob } from '../../../api/job';

const DEBOUNCE_TIME = 1000;

export function* jobFormSaga(): TEffects {
    yield takeEvery(BLUR_FIELD, checkAddress);
    yield takeLatest(UPDATE_FIELD, debounceAndCheckAddress);
    yield takeLatest(START_CREATING_JOB, sendJob);
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
        left: (error: TError) => (validateField(field, EFieldStatus.invalid)),
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

const errorToast = queueToast('Oops! Something went wrong', EToastType.error);
const successToast = queueToast('Job has been created successfully!', EToastType.success);

function* sendJob() {
    const mapState = yield select(mapSelector);
    const maybeAddresses = getJobAddresses(mapState);
    yield maybeAddresses.caseOf({
        nothing: () => put(errorToast),
        just: ({pickup, dropoff}) => call(postJob, {pickup, dropoff}) as any,
    });
}

function* postJob(job: TJob): TEffects {
    const responsePromise = post(JOB_ENDPOINT, job);
    const eitherSuccessOrError = yield call(createJob, responsePromise);
    yield* eitherSuccessOrError.caseOf({
        left: function*(error: TError) {
            yield put(errorToast);
        },
        right: function*() {
            yield call(delay, 500);
            yield put(finishCreatingJob());
            yield put(successToast);
        },
    });
}

function getJobAddresses(mapState: IMapState): Maybe<TJob> {
    const maybePickup = mapState.pickupGeocode;
    const maybeDropoff = mapState.dropoffGeocode;
    const pickup = maybePickup.lift(R.prop('address')).valueOr('');
    const dropoff = maybeDropoff.lift(R.prop('address')).valueOr('');
    return pickup === '' || dropoff === ''
        ? Maybe.nothing()
        : Maybe.just({pickup, dropoff}) 
}