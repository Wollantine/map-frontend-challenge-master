import { EFieldStatus } from "./field";

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const START_CREATING_JOB = 'START_CREATING_JOB';
export const FINISH_CREATING_JOB = 'FINISH_CREATING_JOB';

export const updateField = (fieldName: string, value: any, status: EFieldStatus) => ({
    type: UPDATE_FIELD,
    fieldName,
    value,
    status,
});

export const startCreatingJob = () => ({
    type: START_CREATING_JOB,
});

export const finishCreatingJob = () => ({
    type: FINISH_CREATING_JOB,
});
