import { EFieldStatus } from "./field";
import * as R from 'ramda';
import {TGeocode} from '../../../api/geocode';

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const VALIDATE_FIELD = 'VALIDATE_FIELD';
export const UPDATE_GEOCODE = 'UPDATE_GEOCODE';
export const BLUR_FIELD = 'BLUR_FIELD';
export const START_CREATING_JOB = 'START_CREATING_JOB';
export const FINISH_CREATING_JOB = 'FINISH_CREATING_JOB';

export const updateField = (fieldName: string, value: any) => ({
    type: UPDATE_FIELD,
    fieldName,
    value,
});

export const validateField = (fieldName: string, status: EFieldStatus) => ({
    type: VALIDATE_FIELD,
    fieldName,
    status,
});

export const updateGeocode = (fieldName: string, geocode: TGeocode) => ({
    type: UPDATE_GEOCODE,
    fieldName,
    geocode,
});

export const blurField = (fieldName: string) => ({
    type: BLUR_FIELD,
    fieldName,
});

export const startCreatingJob = () => ({
    type: START_CREATING_JOB,
});

export const finishCreatingJob = () => ({
    type: FINISH_CREATING_JOB,
});
