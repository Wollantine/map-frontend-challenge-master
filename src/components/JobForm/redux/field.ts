import * as R from 'ramda';

export enum EFieldStatus {
    pristine,
    invalid,
    valid,
}

export type TField<T> = {
    value: T;
    status: EFieldStatus;
};

export const isFieldValid: (field: TField<any>) => boolean = R.propEq('status', EFieldStatus.valid);
export const isFieldInvalid: (field: TField<any>) => boolean = R.propEq('status', EFieldStatus.invalid);
